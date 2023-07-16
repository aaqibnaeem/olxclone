import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Select, Modal, Checkbox, Empty } from "antd";
import { db } from "../config/Firebase";
import { get, push, ref, set, update } from "firebase/database";
import ListGroup from "react-bootstrap/ListGroup";

const SubCategory = () => {
  const [mainCats, setMainCats] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [mainSubCats, setMainSubCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMainCat, setSelectedMainCat] = useState({
    mainCategory: "",
    mainKey: "",
  });
  const [editMainSub, setEditMainSub] = useState({});
  const [showOnMenu, setShowOnMenu] = useState(false);

  const getMainCats = async () => {
    await get(ref(db, "categories/")).then((res) => {
      if (res.exists()) {
        let data = Object.values(res.val());
        let tempArr = [];
        let mainSubArr = [];
        for (let i in data) {
          for (let j in data[i]) {
            let obj = {};
            obj.value = data[i][j].mainCategory;
            obj.label = data[i][j].mainCategory;
            obj.key = data[i][j].key;
            if (obj.value && obj.label && obj.key) {
              tempArr.push(obj);
            }
            let parentChildObj = {};
            if (data[i][j].subCategories) {
              parentChildObj = {
                mainCategory: data[i][j].mainCategory,
                mainCategoryKey: data[i][j].key,
                subCategories: Object.values(data[i][j].subCategories),
              };
              mainSubArr.push(parentChildObj);
            }
          }
        }
        setMainCats(tempArr);
        setMainSubCats(mainSubArr);
      }
    });
  };

  useEffect(() => {
    getMainCats();
  }, []);

  const handleChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleSelect = (value) => {
    setSelectedMainCat({
      mainCategory: "",
      mainKey: "",
    });
    for (let i in mainCats) {
      if (mainCats[i].value === value) {
        setSelectedMainCat({
          mainCategory: mainCats[i].value,
          mainKey: mainCats[i].key,
        });
        break;
      }
    }
  };

  const handleEdit = async (e) => {
    let obj = {};
    setEditMainSub({});
    obj.mainKey = e.target.parentNode.id;
    obj.mainCategory = e.target.parentNode.childNodes[0].innerText;
    obj.subKey = e.target.id;
    obj.subCategory = e.target.innerText;
    await get(
      ref(
        db,
        `categories/${obj.mainKey}/${obj.mainCategory}/subCategories/${obj.subKey}/`
      )
    )
      .then((res) => {
        if (res.exists()) {
          let dataObj = res.val();
          obj.showOnMenu = dataObj.showOnMenu;
        } else {
          console.log("error");
        }
      })
      .catch(() => {
        console.log("Some error occured");
      });
    setEditMainSub(obj);
    console.log(editMainSub);
    setShowModal(true);
  };

  const checkChange = (e) => {
    const val = e.target.checked;
    console.log(val);
    if (val) {
      setShowOnMenu(true);
      setEditMainSub({ ...editMainSub, showOnMenu: true });
    } else {
      setShowOnMenu(false);
      setEditMainSub({ ...editMainSub, showOnMenu: false });
    }
  };

  const handleSave = async () => {
    await update(
      ref(
        db,
        `categories/${editMainSub.mainKey}/${editMainSub.mainCategory}/subCategories/${editMainSub.subKey}/`
      ),
      { showOnMenu: showOnMenu }
    )
      .then(() => {
        console.log("Data updated");
      })
      .catch(() => {
        console.log("Some error occured");
      });
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const key = await push(ref(db, "/")).key;
    const obj = {
      subCategory: subCategory,
      key: key,
      showOnMenu: false,
    };
    if (selectedMainCat.mainCategory && obj.subCategory && obj.key) {
      await set(
        ref(
          db,
          `categories/${selectedMainCat.mainKey}/${selectedMainCat.mainCategory}/subCategories/${key}`
        ),
        obj
      )
        .then(() => {
          console.log("Data written to DB");
          setSubCategory("");
          getMainCats();
        })
        .catch(() => {
          console.log("Error occured");
        });
    } else {
      console.log("All fields required");
    }
  };

  return (
    <>
      <h4>Sub Category</h4>
      <Button onClick={() => console.log(mainSubCats)}>show</Button>
      <hr />
      <Row>
        <Col xs={24} md={12} lg={6} className="m-2">
          <label htmlFor="mainCategory">Main Category</label>
          <Select
            id="mainCategory"
            className="w-100"
            options={mainCats}
            onChange={handleSelect}
          />
        </Col>
        <Col xs={24} md={12} lg={6} className="m-2">
          <label htmlFor="subCategory">Sub Category </label>
          <Input
            value={subCategory}
            onChange={(e) => handleChange(e)}
            name="subcategory"
            placeholder="Category name"
            id="subCategory"
          />
        </Col>
        <Col
          sm={24}
          md={12}
          lg={4}
          className="d-flex align-items-end justify-content-start m-2"
        >
          <Button
            type="default"
            onClick={handleSubmit}
            disabled={!subCategory || selectedMainCat.mainCategory === ""}
          >
            Save
          </Button>
        </Col>
      </Row>
      <div className="ps-2">
        {mainSubCats?.length > 0 ? (
          mainSubCats.map((v, i) => {
            return (
              <ListGroup key={i}>
                <ListGroup.Item className="d-flex justify-content-between align-items-start w-100 mb-2">
                  <div
                    className="d-flex align-items-start overflow-x-auto"
                    id={v.mainCategoryKey}
                  >
                    <div className="fw-bold align-self-center">
                      {v.mainCategory}
                    </div>
                    {v.subCategories?.map((v, i) => {
                      return (
                        <ListGroup.Item
                          className="sub-cat border-0"
                          key={i}
                          id={v.key}
                          onClick={(e) => handleEdit(e)}
                        >
                          {v.subCategory}
                        </ListGroup.Item>
                      );
                    })}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
      <Modal
        title="Check to show on menu bar"
        centered
        open={showModal}
        onOk={handleSave}
        onCancel={() => setShowModal(false)}
      >
        <div>
          <span>
            Main Category : <b>{editMainSub.mainCategory}</b>
          </span>
        </div>
        <div>
          <span>
            Sub Category : <b>{editMainSub.subCategory}</b>
          </span>
        </div>
        <div>
          <label htmlFor="checkbox">Show on menu</label>
          <Checkbox
            checked={editMainSub.showOnMenu}
            id="checkbox"
            className="ms-2"
            onChange={(e) => checkChange(e)}
          />
        </div>
      </Modal>
    </>
  );
};

export default SubCategory;
