import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Table, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { db, storage } from "../config/Firebase";
import { get, push, ref, set } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
const { Column } = Table;
const MainCategory = () => {
  const [mainCategory, setMainCategory] = useState({
    mainCategory: "",
    key: "",
    imgURL: "",
  });
  const [mainCats, setMainCats] = useState([]);

  const handleChange = (e) => {
    setMainCategory({ ...mainCategory, [e.target.name]: e.target.value });
  };
  const getMainCats = async () => {
    await get(ref(db, "categories/"))
      .then((res) => {
        if (res.exists()) {
          let data = res.val();
          let dataArr = Object.values(data);
          let tempArr = [];
          for (let i in dataArr) {
            for (let j in dataArr[i]) {
              let obj = {};
              obj.mainCategory = dataArr[i][j].mainCategory;
              obj.key = dataArr[i][j].key;
              obj.imgURL = dataArr[i][j].imgURL;
              if (obj.mainCategory && obj.key) {
                tempArr.push(obj);
              }
            }
          }
          setMainCats(tempArr);
        }
      })
      .catch((err) => {
        console.log("Some error occured");
      });
  };
  useEffect(() => {
    getMainCats();
  }, []);

  const uploadRequest = async (options) => {
    const { file } = options;
    const catkey = await push(ref(db, "/")).key;
    const obj = {
      mainCategory: mainCategory.mainCategory,
      key: catkey,
    };

    const storageref = sRef(
      storage,
      `categories/${catkey}/${mainCategory.mainCategory}/${file.name}`
    );
    await uploadBytes(storageref, file)
      .then(async (snapshot) => {
        await getDownloadURL(snapshot.ref)
          .then((url) => {
            obj.imgURL = url;
            setMainCategory(obj);
            message.success("Image uploaded successfully.");
          })
          .catch((e) => {
            message.error("Error in uploading.");
          });
      })
      .catch((e) => {
        message.error("Some error occured.");
      });
  };

  const handleSubmit = async () => {
    await set(
      ref(db, `categories/${mainCategory.key}/${mainCategory.mainCategory}/`),
      mainCategory
    )
      .then((res) => {
        message.success("Data written to DB");
      })
      .catch((err) => {
        message.error("Some error occured.");
      });
    setMainCategory({
      mainCategory: "",
      key: "",
      imgURL: "",
    });
    getMainCats();
  };

  return (
    <>
      <h4>Main Category</h4>
      <hr />
      <Row className="d-flex align-items-end">
        <Col sm={24} md={12} lg={6} className="m-2">
          <label htmlFor="mainCategory">Main Category </label>
          <Input
            value={mainCategory.mainCategory}
            onChange={(e) => handleChange(e)}
            name="mainCategory"
            placeholder="Category name"
            id="mainCategory"
          />
        </Col>
        <Col sm={24} md={12} lg={3} className="m-2">
          <Upload
            customRequest={(e) => uploadRequest(e)}
            maxCount={1}
            showUploadList={false}
            disabled={!mainCategory}
          >
            <Button className="d-flex align-items-center">
              <UploadOutlined />
              Upload image
            </Button>
          </Upload>
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
            disabled={!mainCategory.imgURL}
          >
            Save
          </Button>
        </Col>
      </Row>
      <hr />
      <Table dataSource={mainCats} style={{ width: "100%" }}>
        <Column title="Main Category" dataIndex="mainCategory" key="key" />
        <Column title="ID" dataIndex="key" key="key" />
        <Column title="Image URL" dataIndex="imgURL" key="key" />
        <Column
          title="Action"
          render={() => (
            <>
              <Button className="mx-1 w-100 mb-1">Edit</Button>
              <Button className="mx-1 w-100 ">Delete</Button>
            </>
          )}
        />
      </Table>
    </>
  );
};

export default MainCategory;
