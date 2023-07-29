import { push, get, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoCloudUpload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../config/Firebase";
import { Button, Col, Divider, Input, Radio, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Upload } from "antd";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

let Sell = () => {
  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [mainCategory, setMainCategory] = useState({
    mainCategory: "",
    key: "",
  });
  const [subCategory, setSubCategory] = useState({
    subCategory: "",
    key: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const [condition, setCondition] = useState("");
  const [sellInfo, setSellInfo] = useState({
    mainCategory: mainCategory.mainCategory,
    subCategory: subCategory.subCategory,
    adTitle: "",
    key: "",
    description: "",
    brand: "",
    condition: condition,
    price: null,
    user: "DemoUser",
  });
  const [disablePost, setDisablePost] = useState(true);

  const handleCondition = (e) => {
    setCondition(e.target.value);
    setSellInfo({ ...sellInfo, condition: e.target.value });
  };
  const navigate = useNavigate();

  const getMainCats = async () => {
    await get(ref(db, "categories/"))
      .then((res) => {
        if (res.exists()) {
          let data = res.val();
          let dataArr = Object.values(data);
          let tempArr = [];
          for (let i in dataArr) {
            for (let j in dataArr[i]) {
              if (dataArr[i][j].subCategories) {
                let obj = {};
                obj.mainCategory = dataArr[i][j].mainCategory;
                obj.value = dataArr[i][j].mainCategory;
                obj.label = dataArr[i][j].mainCategory;
                obj.key = dataArr[i][j].key;
                obj.subCategories = dataArr[i][j].subCategories;
                if (obj.mainCategory && obj.key) {
                  tempArr.push(obj);
                }
              }
            }
          }
          setMainCats(tempArr);
          setMainCategory({
            ...mainCategory,
            mainCategory: tempArr[0].mainCategory,
            key: tempArr[0].key,
          });
          const subObj = Object.values(tempArr[0].subCategories)[0];
          setSubCategory({
            ...subCategory,
            subCategory: subObj.subCategory,
            key: subObj.key,
          });
          setSellInfo({
            ...sellInfo,
            subCategory: subObj.subCategory,
            mainCategory: tempArr[0].mainCategory,
          });
        }
      })
      .catch((err) => {
        console.log("Some error occured");
      });
  };
  useEffect(() => {
    getMainCats();
  }, []);

  const handleChange = (value) => {
    setSubCategory({ category: "", key: "" });
    setSubCats([]);
    mainCats.map(async (item, index) => {
      if (item.value === value) {
        setMainCategory({ mainCategory: item.mainCategory, key: item.key });
        await get(ref(db, `categories/${item.key}/`)).then((res) => {
          if (res.exists()) {
            const data = Object.values(res.val());
            if (data[0].subCategories) {
              const subSelectArr = Object.values(data[0]?.subCategories);
              const tempArr = [];
              for (let i in subSelectArr) {
                let obj = {};
                obj.value = subSelectArr[i].subCategory;
                obj.label = subSelectArr[i].subCategory;
                obj.key = subSelectArr[i].key;
                obj.subCategory = subSelectArr[i].subCategory;
                tempArr.push(obj);
              }
              setSubCats(tempArr);
              setSubCategory({
                subCategory: tempArr[0].value,
                key: tempArr[0].key,
              });
              setSellInfo({
                ...sellInfo,
                mainCategory: value,
                subCategory: tempArr[0].value,
              });
            }
          }
        });
      }
    });
  };

  const handleSubChange = (value) => {
    setSellInfo({ ...sellInfo, category: value });
    subCats.map((item, index) => {
      if (item.subCategory === value) {
        setSubCategory({ subCategory: item.subCategory, key: item.key });
      }
    });
  };

  const toggleDetails = () => {
    setShowDetails(true);
  };

  const uploadRequest = async (options) => {
    const { file } = options;
    const adKey = await push(ref(db, "/")).key;
    console.log(adKey);

    const storageref = await sRef(
      storage,
      `ads/${sellInfo?.user}/${sellInfo?.mainCategory}/${subCategory?.subCategory}/${adKey}/`
    );
    await uploadBytes(storageref, file)
      .then(async (snapshot) => {
        await getDownloadURL(snapshot.ref)
          .then((url) => {
            setSellInfo({ ...sellInfo, imgURL: url, key: adKey });
            message.success("Image uploaded successfully.");
            setDisablePost(false)
          })
          .catch((e) => {
            message.error("Error in uploading.");
          });
      })
      .catch((e) => {
        message.error("Some error occured.");
      });
  };

  const handleSubmit = () => {
    if (
      sellInfo.mainCategory &&
      sellInfo.subCategory &&
      sellInfo.adTitle &&
      sellInfo.key &&
      sellInfo.description &&
      sellInfo.brand &&
      sellInfo.condition &&
      sellInfo.price &&
      sellInfo.user
    ) {
      //Set user ads
      set(
        ref(
          db,
          `userAds/${sellInfo.user}/${sellInfo.subCategory}/${sellInfo.key}`
        ),
        sellInfo
      )
        .then(() => {
          message.success("Please wait.");
          setDisablePost(false);
        })
        .catch(() => {
          message.error("Error in posting your Ad.");
        });
      // Set all ads
      set(
        ref(
          db,
          `allAds//${sellInfo.subCategory}/${sellInfo.key}`
        ),
        sellInfo
      )
        .then(() => {
          message.success("Ad Posted SuccessFully.");
          setSellInfo({
            mainCategory: mainCategory.mainCategory,
            subCategory: subCategory.subCategory,
            adTitle: "",
            key: "",
            description: "",
            brand: "",
            condition: condition,
            price: null,
            user: "DemoUser",
          });
          setDisablePost(true);
        })
        .catch(() => {
          message.error("Error in posting your Ad.");
        });
    } else {
      message.error("Please input all fields");
    }
  };

  return (
    <>
      <header>
        <div
          className="w-100 d-flex align-items-center justify-content-start shadow-sm"
          style={{ height: "60px", backgroundColor: "#f7f8f8" }}
        >
          <IoArrowBack
            className="fs-3 ms-2 me-4 hc"
            onClick={() => navigate("/", { replace: true })}
          />
          <img
            src="https://www.olx.com.pk/assets/logo_noinline.1cdf230e49c0530ad4b8d43e37ecc4a4.svg"
            alt=""
          />
        </div>
      </header>
      <h5 className="fw-bold text-center pt-4 pb-2">POST YOUR AD</h5>
      <div className="mx-3 border rounded-2 border-secondary">
        <div className="p-2">
          <h6 className="fw-bold fs-5 text-uppercase">Selected Category</h6>
          <Row className="d-flex align-items-end">
            <Col xs={24} sm={11} md={10} lg={8} className="me-2 mb-2">
              <label htmlFor="mainCategory">Main Category</label>
              <Select
                id="mainCategory"
                className="w-100 rounded-1 border-secondary border-2"
                options={mainCats}
                onChange={handleChange}
                size="large"
                value={mainCategory.mainCategory}
                style={{ border: "8px solid black" }}
                bordered={false}
              />
            </Col>
            <Col xs={24} sm={11} md={10} lg={8} className="me-2 mb-2">
              <label htmlFor="mainCategory">Sub Category</label>
              <Select
                id="subCategories"
                className="w-100 rounded-1 border-secondary border-2"
                options={subCats}
                value={subCategory.subCategory}
                disabled={!subCategory?.subCategory}
                onChange={handleSubChange}
                size="large"
                style={{ border: "8px solid black" }}
                bordered={false}
              />
            </Col>
            <Col xs={24} sm={11} md={2} lg={4} className="me-2 mb-2">
              <Button
                disabled={
                  !mainCategory.mainCategory || !subCategory.subCategory
                }
                size="large"
                onClick={toggleDetails}
                className="border-2 rounded-1 border-secondary pb-4 text-white"
                style={{ backgroundColor: "#002f34" }}
              >
                Add details
              </Button>
            </Col>
          </Row>
        </div>
        <div className="mt-3">
          {showDetails ? (
            <div className="border-top border-secondary w-100 m-0 p-0">
              <div className="p-2">
                <h5 className="fw-bold text-center">INCLUDE SOME DETAILS</h5>
                <Row>
                  <Col xs={24} className="mb-2">
                    <label htmlFor="adTitle">Ad title</label>
                    <Input
                      size="large"
                      id="adTitle"
                      required
                      maxLength={70}
                      showCount
                      value={sellInfo.adTitle}
                      onChange={(e) =>
                        setSellInfo({ ...sellInfo, adTitle: e.target.value })
                      }
                      className="rounded-1 border-secondary border-2"
                    />
                  </Col>
                  <Col xs={24} className="mb-2">
                    <label htmlFor="adDescription">Description</label>
                    <TextArea
                      className="rounded-1 border-secondary border-2"
                      size="large"
                      id="adDescription"
                      required
                      maxLength={4096}
                      showCount
                      value={sellInfo.description}
                      onChange={(e) =>
                        setSellInfo({
                          ...sellInfo,
                          description: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col xs={24} className="mb-2">
                    <label htmlFor="brand">Brand</label>
                    <Input
                      size="large"
                      id="brand"
                      required
                      maxLength={30}
                      showCount
                      value={sellInfo.brand}
                      onChange={(e) =>
                        setSellInfo({ ...sellInfo, brand: e.target.value })
                      }
                      className="rounded-1 border-secondary border-2"
                    />
                  </Col>
                  <Col xs={24} className="mb-2">
                    <label htmlFor="brand">Condition</label>
                    <Radio.Group
                      buttonStyle="solid"
                      className="d-flex"
                      size="large"
                      onChange={handleCondition}
                      value={sellInfo.condition}
                    >
                      <div className="d-flex flex-wrap">
                        <div>
                          <Radio.Button
                            className="me-1 mb-1 border-2 rounded-1 border-secondary"
                            value="New"
                          >
                            New
                          </Radio.Button>
                        </div>
                        <div>
                          <Radio.Button
                            className="me-1 mb-1 border-2 rounded-1 border-secondary"
                            value="OpenBox"
                          >
                            Open Box
                          </Radio.Button>
                        </div>
                        <div>
                          <Radio.Button
                            className="me-1 mb-1 border-2 rounded-1 border-secondary"
                            value="Used"
                          >
                            Used
                          </Radio.Button>
                        </div>
                        <div>
                          <Radio.Button
                            className="me-1 mb-1 border-2 rounded-1 border-secondary"
                            value="Refurbished"
                          >
                            Refurbished
                          </Radio.Button>
                        </div>
                        <div>
                          <Radio.Button
                            className="me-1 mb-1 border-2 rounded-1 border-secondary"
                            value="FPNW"
                          >
                            For Parts Not Working
                          </Radio.Button>
                        </div>
                      </div>
                    </Radio.Group>
                  </Col>
                  <Col xs={24} className="my-2">
                    <h5>SET A PRICE</h5>
                    <label htmlFor="price">Price</label>
                    <Input
                      size="large"
                      type="number"
                      min={1}
                      value={sellInfo.price}
                      onChange={(e) =>
                        setSellInfo({ ...sellInfo, price: e.target.value })
                      }
                      bordered={false}
                      className="rounded-1 border-secondary border-2"
                      style={{ border: "8px solid black" }}
                    />
                  </Col>
                  <Col xs={24} className="my-2">
                    <h5>UPLOAD PHOTO</h5>
                    <Upload
                      customRequest={(e) => uploadRequest(e)}
                      maxCount={1}
                      showUploadList={false}
                      disabled={!mainCategory}
                    >
                      <Button
                        className="d-flex align-items-center"
                        disabled={sellInfo.imgURL}
                      >
                        <IoCloudUpload className="me-2" />
                        {sellInfo.imgURL ? "Uploaded" : "Upload image"}
                      </Button>
                    </Upload>
                  </Col>
                  <Col xs={24}></Col>
                  <Divider />
                  <Col xs={24}>
                    <Button
                      className="rounded-1 text-white w-100 h-100 m-0 p-2 fw-bold"
                      style={{ backgroundColor: "#002f34" }}
                      onClick={handleSubmit}
                      disabled={disablePost}
                    >
                      Post now
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sell;
