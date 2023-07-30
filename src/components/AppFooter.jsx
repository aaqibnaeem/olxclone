import React from "react";
import footerImg from "../assets/images/olxfooter.webp";
import { Col, Row } from "antd";
import ios from "../assets/images/ios.svg";
import android from "../assets/images/android.svg";
import huawei from "../assets/images/huawei.svg";

let AppFooter = () => {
  return (
    <div style={{ background: "rgba(0,47,52,.03)" }}>
      <Row className="d-flex align-items-center justify-content-around">
        <Col xs={24} md={12} lg={8} className="mb-2 d-none d-lg-block">
          <div>
            <img src={footerImg} alt="footer_img" width="100%" maxWidth="300" />
          </div>
        </Col>
        <Col xs={24} md={12} lg={8} className="mb-2 d-none d-lg-block">
          <h4>TRY THE OLX APP</h4>
          <p className="fs-6 w-100">
            Buy, sell and find just about anything using the app on your mobile.
          </p>
        </Col>
        <Col xs={24} md={12} lg={8} className="mb-4">
          <p className="fw-bold ms-3 text-center">GET YOUR APP TODAY</p>
          <div className="d-flex justify-content-around">
            <img src={ios} alt="ios" style={{ maxWidth: "120px" }} />
            <img src={android} alt="android" style={{ maxWidth: "120px" }} />
            <img src={huawei} alt="huawei" style={{ maxWidth: "120px" }} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={5}>
          <ul style={{ listStyle: "none" }}>
            <span className="fw-bold">POPULAR CATEGORIES</span>
            <li>Cars</li>
            <li>Flats for rent</li>
            <li>Mobile phones</li>
            <li>Jobs</li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <ul style={{ listStyle: "none" }}>
            <span className="fw-bold">TRENDING SEARCHES</span>
            <li>Bikes</li>
            <li>Watches</li>
            <li>Books</li>
            <li>Dogs</li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <ul style={{ listStyle: "none" }}>
            <span className="fw-bold">ABOUT US</span>
            <li>About Dubbizle Group</li>
            <li>OLX Blog</li>
            <li>Contact Us</li>
            <li>Olx for business</li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <ul style={{ listStyle: "none" }}>
            <span className="fw-bold">OLX</span>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Terms of use</li>
            <li>Privacy policy</li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <ul style={{ listStyle: "none" }}>
            <span className="fw-bold">FOLLOW US</span>
            <li>About Dubbizle Group</li>
            <li>OLX Blog</li>
            <li>Contact Us</li>
            <li>Olx for business</li>
          </ul>
        </Col>
      </Row>
      <div className="d-flex align-items-end justify-content-end p-3 bg-dark text-light fw-bold" style={{fontSize:"12px"}}>Free Clasifieds in Pakisatn. 2006-2023 OLX</div>
    </div>
  );
};

export default AppFooter;
