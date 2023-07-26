import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { Row, Col, Modal } from "antd";
import { BsSearch } from "react-icons/bs";
import { GrDown } from "react-icons/gr";
import { get, ref } from "firebase/database";
import { db } from "../config/Firebase";
import Banner from "../assets/images/banner.jpg";
import { Link } from "react-router-dom";
import UserTab from "./UserTab";

let Home = () => {
  const [menuBar, setMenuBar] = useState([]);
  const [mainCats, setMainCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCheck = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userCheck);
  }, []);

  const getMenuBar = async () => {
    get(ref(db, "categories/"))
      .then((res) => {
        if (res.exists()) {
          let data = Object.values(res.val());
          let tempArr = [];
          for (let i in data) {
            for (let j in data[i]) {
              if (data[i][j].subCategories) {
                let arrs = Object.values(data[i][j].subCategories);
                for (let k in arrs) {
                  if (arrs[k].showOnMenu) {
                    tempArr.push(arrs[k]);
                  }
                }
              }
            }
          }
          setMenuBar(tempArr);
        } else {
          console.log("error");
        }
      })
      .catch(() => {
        console.log("Some error occured.");
      });
  };

  const getMainCats = async () => {
    await get(ref(db, "categories/"))
      .then((res) => {
        if (res.exists()) {
          let dataArr = Object.values(res.val());
          let tempArr = [];
          for (let i in dataArr) {
            for (let j in dataArr[i]) {
              let obj = {};
              obj.imgURL = dataArr[i][j].imgURL;
              obj.mainCat = dataArr[i][j].mainCategory;
              tempArr.push(obj);
            }
          }
          setMainCats(tempArr);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAuth = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    getMenuBar();
    getMainCats();
  }, []);

  return (
    <>
      <header
        style={{
          backgroundColor: "#f7f8f8",
        }}
        className="pb-2 px-4"
      >
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "10px" }}
        >
          <div className="me-5">
            <svg
              height="20"
              viewBox="0 0 36.289 20.768"
              alt="Logo"
              fill="#3a77ff"
            >
              <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
            </svg>
          </div>
          <div className="me-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="88.9"
              height="33"
              alt="OLX Motors"
            >
              <defs>
                <linearGradient
                  id="a"
                  x1=".5"
                  x2=".5"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                ></linearGradient>
              </defs>
              <path
                stroke="rgba(0,0,0,0)"
                d="M40 20.5h1v-6.2l3 6.2h.6l2.8-6.2v6.2h1v-8.3h-1L44.1 19l-3-6.8H40zm18.3-4.2A4.1 4.1 0 0 0 54 12a4.1 4.1 0 0 0-4.2 4.3 4.1 4.1 0 0 0 4.2 4.3 4.1 4.1 0 0 0 4.2-4.3zm-7.3 0a3 3 0 0 1 3-3.3 3 3 0 0 1 3.2 3.3 3 3 0 0 1-3 3.3 3 3 0 0 1-3.2-3.3zm8.2-3.3h2.3v7.5h1V13H65v-1h-5.7zm15 3.3A4.1 4.1 0 0 0 70 12a4.1 4.1 0 0 0-4.2 4.3 4.1 4.1 0 0 0 4.2 4.3 4.1 4.1 0 0 0 4.2-4.3zm-7.2 0a3 3 0 0 1 3-3.3 3 3 0 0 1 3 3.3 3 3 0 0 1-3 3.3 3 3 0 0 1-3-3.3zm13.2-1.7c0 1-.6 1.6-1.8 1.6h-1.6V13h1.6c1.2 0 1.8.6 1.8 1.6zM75.7 12v8.4h1V17H78l2 3.4h1.3l-2-3.5a2.4 2.4 0 0 0 2-2.4c0-1.4-1-2.5-3-2.5zm12.7 6c0-3-4.5-1.7-4.5-3.8 0-1 .7-1.4 1.6-1.4a1.5 1.5 0 0 1 1.6 1.2h1.2a2.5 2.5 0 0 0-2.7-2.1c-1.7 0-2.8 1-2.8 2.3 0 3 4.5 1.7 4.5 4 0 .7-.6 1.3-1.7 1.3a1.5 1.5 0 0 1-1.7-1.4h-1.2c0 1.4 1.3 2.4 3 2.4a2.5 2.5 0 0 0 2.7-2.4z"
              ></path>
              <path
                fill="url(#a)"
                d="M0 16.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z"
                opacity=".6"
              ></path>
              <path d="M24.7 13.5a1.1 1.1 0 0 0-1.4-.7l-.6.2-1-2.2-.4-.1a16 16 0 0 0-4.8-.7 12 12 0 0 0-4.3.7l-.3.1-1 2.3h-.5a1.1 1.1 0 0 0-.6 2v.2a4 4 0 0 0-.4 1.5v4a2.1 2.1 0 0 0 0 .6.7.7 0 0 0 .8.5h1.6a.7.7 0 0 0 .8-.5 2.1 2.1 0 0 0 0-.7v-.3a47.1 47.1 0 0 0 8.3 0v.3a2.1 2.1 0 0 0 0 .7.7.7 0 0 0 .8.5h1.6a.7.7 0 0 0 .7-.5 2.1 2.1 0 0 0 .1-.7v-4a3.7 3.7 0 0 0-.4-1.5V15h.3a1.1 1.1 0 0 0 .7-1.5zm-12.2-2.1a11.3 11.3 0 0 1 4-.6 15.2 15.2 0 0 1 4.6.6l.9 1.8a17.6 17.6 0 0 1-4.3.4H17a28.2 28.2 0 0 1-5.4-.3zm-.6 9.3a2.2 2.2 0 0 1 0 .4h-1.7a2.2 2.2 0 0 1 0-.4V20a1 1 0 0 0 .3 0l1.4.2v.4zm11.4 0a2.2 2.2 0 0 1 0 .4h-1.6a2.2 2.2 0 0 1 0-.4v-.4H23a1 1 0 0 0 .4-.2zm.5-6.5l-1.2.4.5 1a3 3 0 0 1 .3 1.2V18l-.1.7c0 .3-.2.7-.5.7-3 .3-4.5.5-6 .5s-3-.2-6.2-.5c-.2 0-.3-.3-.4-.6V18a17 17 0 0 1 0-1 3.2 3.2 0 0 1 .3-1.3l.5-1-1-.2a.3.3 0 0 1-.2-.4.3.3 0 0 1 .4-.3l1.1.4a23.6 23.6 0 0 0 5 .3h1.4a17.9 17.9 0 0 0 4.6-.5h.3l1-.4a.3.3 0 0 1 .4.3.3.3 0 0 1-.2.4z"></path>
              <path d="M12 16a1.2 1.2 0 1 0 1.1 1.2A1.2 1.2 0 0 0 12 16zm0 1.6a.4.4 0 1 1 .3-.4.4.4 0 0 1-.4.4zm9.6-1.6a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2zm0 1.6a.4.4 0 1 1 .5-.4.4.4 0 0 1-.5.4zm-7.8.2h6v.8h-6z"></path>
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97.25"
              height="33"
              alt="OLX Property"
            >
              <defs>
                <linearGradient
                  id="a"
                  x1=".5"
                  x2=".5"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                ></linearGradient>
              </defs>
              <path
                stroke="rgba(0,0,0,0)"
                d="M41.1 16.64v-3.07h1.6c1.25 0 1.78.58 1.78 1.55 0 .94-.53 1.52-1.78 1.52zm4.5-1.52c0-1.37-.93-2.45-2.9-2.45H40v8.36h1.1v-3.49h1.6c2.08 0 2.9-1.15 2.9-2.42zm5.82.01c0 .94-.54 1.6-1.77 1.6h-1.6v-3.16h1.6c1.25 0 1.77.61 1.77 1.57zm-4.47-2.46v8.36h1.1v-3.42h1.31l2 3.42h1.3l-2.1-3.5a2.36 2.36 0 0 0 2-2.4c0-1.36-.94-2.45-2.9-2.45zm15.3 4.18a4.12 4.12 0 0 0-4.2-4.28 4.13 4.13 0 0 0-4.2 4.28 4.13 4.13 0 0 0 4.2 4.27 4.12 4.12 0 0 0 4.2-4.27zm-7.3 0a3.05 3.05 0 0 1 3.1-3.33 3.05 3.05 0 0 1 3.07 3.33 3.06 3.06 0 0 1-3.08 3.32 3.06 3.06 0 0 1-3.09-3.32zm9.82-.2v-3.08h1.6c1.25 0 1.78.58 1.78 1.55 0 .94-.53 1.52-1.77 1.52zm4.5-1.53c0-1.36-.93-2.44-2.9-2.44h-2.7v8.35h1.1v-3.49h1.6c2.08 0 2.9-1.15 2.9-2.42zm5.85-2.46h-4.5v8.37h4.5v-.9h-3.4v-2.88h3.04v-.9h-3.04v-2.8h3.4zm6.14 2.48c0 .93-.54 1.6-1.78 1.6h-1.6v-3.17h1.6c1.25 0 1.78.61 1.78 1.57zm-4.48-2.47v8.36h1.1v-3.42h1.32l1.98 3.42h1.3l-2.1-3.5a2.36 2.36 0 0 0 2-2.4c0-1.36-.94-2.45-2.9-2.45zm6.78.9h2.29v7.46h1.1v-7.47h2.27v-.89h-5.66zm9.04 4.3v3.16h1.1v-3.15l2.72-5.2h-1.2l-2.07 4.23-2.07-4.24h-1.2z"
              ></path>
              <path
                fill="url(#a)"
                d="M0 16.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z"
                opacity=".57"
              ></path>
              <path d="M25.03 21.92v-9.35l-4.99-1.66v1.05l4 1.33v8.59h-5V7.85h-8.38v14.08h-.4v1h15.17v-1zm-6.98-11.68v11.68h-6.4V8.84h6.4z"></path>
              <path d="M15.17 10.3h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm2.42 1.6h1.61v.81h-1.6zm-2.42 0h1.6v.81h-1.6zm2.42 2.42h1.61v.81h-1.6zm-2.42 0h1.6v.81h-1.6zm2.42 1.62h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm2.42 2.42h1.61v.8h-1.6zm-2.42 0h1.6v.8h-1.6zm8.87-4.04h.8v.81h-.8zm-1.62 0h.8v.81H20zm1.62 1.62h.8v.8h-.8zm-1.62 0h.8v.8H20zm1.62 2.42h.8v.8h-.8zm-1.62 0h.8v.8H20z"></path>
            </svg>
          </div>
        </div>
        {/* Toolbar End */}
        <div className="d-flex align-items-center mt-3">
          <Row className="d-flex align-items-center w-100">
            <Col xs={6} md={2} lg={1}>
              <div
                style={{
                  marginTop: "12px",
                  paddingBottom: "10px",
                  width: "100%",
                }}
              >
                <svg height="40" viewBox="0 0 36.289 20.768" alt="Logo">
                  <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
                </svg>
              </div>
            </Col>
            <Col xs={18} md={10} lg={5}>
              <div className="ms-5 border border-2 border-dark rounded-1 p-2 d-flex align-items-center bg-white">
                <div className="ps-2 mb-1">
                  <BsSearch />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-0 mx-2 w-100"
                    style={{ outline: "none" }}
                    value={"Pakistan"}
                    readOnly
                  />
                </div>
                <div className="pe-2 mb-1">
                  <GrDown />
                </div>
              </div>
            </Col>
            <Col sm={24} md={12} lg={12} className="d-flex w-100">
              <div className="ms-2 border border-2 border-dark rounded-start-1 p-2 d-flex align-items-center bg-white w-100">
                <div className="w-100">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-0 mx-2 w-100"
                    style={{ outline: "none" }}
                    placeholder="Find Cars, Mobile Phones and more..."
                  />
                </div>
              </div>
              <div>
                <button
                  style={{
                    background: "#002f34",
                    color: "white",
                    height: "46px",
                    width: "46px",
                    border: "none",
                  }}
                  className="rounded-end-1 py-2"
                >
                  <BsSearch className="fs-4 fw-bold" />
                </button>
              </div>
            </Col>
            <Col
              xs={12}
              md={12}
              lg={4}
              className="d-flex justify-content-center align-items-center my-1 p-0"
            >
              {!isLoggedIn ? (
                <p
                  className="fs-6 fw-bold m-0 p-0 login-btn"
                  onClick={() => setShowModal(true)}
                >
                  Login
                </p>
              ) : (
                <UserTab handleLogout={handleLogout} />
              )}
            </Col>
            <Col
              xs={12}
              md={12}
              lg={2}
              className="d-flex justify-content-center align-items-center my-1 p-0"
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  position: "relative",
                  margin: "0px",
                  padding: "0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => (isLoggedIn ? null : setShowModal(true))}
              >
                <img
                  src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg"
                  alt=""
                />
                <div
                  style={{ position: "absolute" }}
                  className="d-flex align-items-center"
                >
                  <img
                    src="https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg"
                    alt=""
                  />
                  <span className="text-uppercase fw-bold ms-2">Sell</span>
                </div>
              </button>
            </Col>
          </Row>
        </div>
        {/* Location,Search and Login End */}
      </header>
      <div className="p-3" style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,.1)" }}>
        <div
          style={{ fontSize: "14px" }}
          className="d-flex align-items-center justify-content-start"
        >
          <div className="all-cat-wrapper">
            <span className="fw-bold">All Categories</span>
            <img
              src="https://www.olx.com.pk/assets/iconArrowDown_noinline.ec05eae7013321c193965ef15d4e2174.svg"
              alt="cat-arrow"
              className="ms-2"
            />
          </div>
          {menuBar.length > 0
            ? menuBar.map((v, i) => {
                return (
                  <span key={i} className="ms-2 sub-menu-item">
                    {v.subCategory}
                  </span>
                );
              })
            : null}
        </div>
      </div>
      {/* Menu bar End */}
      <div className="px-5 py-3">
        <img src={Banner} alt="banner" style={{ width: "100%" }} />
        <div className="mt-3">
          <h4 className="fw-bold mb-3">All Categories</h4>
          <div className="d-flex flex-wrap align-items-start justify-content-evenly justify-content-md-start">
            {mainCats.length > 0
              ? mainCats.map((v, i) => {
                  return (
                    <Link to="#" className="text-decoration-none text-dark">
                      <div
                        key={i}
                        className="d-flex flex-column justify-content-start align-items-center"
                        style={{ width: "130px" }}
                      >
                        <img
                          src={v.imgURL}
                          style={{ width: "80px" }}
                          alt="cat-img"
                        />
                        <h6
                          className="mt-2 text-center fw-bold text-capitalize"
                          style={{ maxWidth: "100px" }}
                        >
                          {v.mainCat}
                        </h6>
                      </div>
                    </Link>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <Modal
        title=""
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        style={{ maxWidth: "400px" }}
      >
        <div className="d-flex flex-column align-items-center">
          <img
            src="https://www.olx.com.pk/assets/brandIconLogin_noinline.93e8a1a9cf50902ba5250814f57810ff.svg"
            alt="logo"
          />
          <div className="container d-flex flex-column align-items-center">
            <p>WELCOME TO OLX</p>
            <p style={{ fontSize: "18x" }}>
              The trusted community of buyers and sellers.
            </p>
            <div
              className="modal-content-wrapper"
              style={{ maxWidth: "275px" }}
            >
              <div
                onClick={handleAuth}
                className="d-flex align-items-center justify-content-start border border-3 border-dark rounded-1 py-2 px-3 w-100 mb-2"
              >
                <img
                  src="https://www.olx.com.pk/assets/iconGoogleLogin_noinline.633b1f5afb5219bedca01d2367642a28.svg"
                  alt="g"
                />
                <span className="ms-3 fs-6 fw-bold">Continue with Google</span>
              </div>
              <div
                onClick={handleAuth}
                className="d-flex align-items-center justify-content-start border border-3 border-dark rounded-1 py-2 px-3 w-100 mb-2"
              >
                <img
                  src="https://www.olx.com.pk/assets/iconFacebookLogin_noinline.70f71af03bbf63ca01a044ff5c5eb342.svg"
                  alt="f"
                />
                <span className="ms-3 fs-6 fw-bold">
                  Continue with Facebook
                </span>
              </div>
              <div
                onClick={handleAuth}
                className="d-flex align-items-center justify-content-start border border-3 border-dark rounded-1 py-2 px-3 w-100 mb-2"
              >
                <img
                  src="https://www.olx.com.pk/assets/iconMailLogin_noinline.248b2cbda65d833f5f8f87f18a346cc9.svg"
                  alt="f"
                />
                <span className="ms-3 fs-6 fw-bold">Continue with Email</span>
              </div>
              <div
                onClick={handleAuth}
                className="d-flex align-items-center justify-content-start border border-3 border-dark rounded-1 py-2 px-3 w-100 mb-2"
              >
                <img
                  src="https://www.olx.com.pk/assets/iconPhoneLogin_noinline.4dcd5ec6754daea7e5c3db60df33309c.svg"
                  alt="f"
                />
                <span className="ms-3 fs-6 fw-bold">Continue with Phone</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Home;
