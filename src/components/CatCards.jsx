import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import AdCard from "./AdCard";
import { Col, Row } from "antd";

let CatCards = (props) => {
  const { adDetails } = props;
  console.log(adDetails);
  return (
    <>
      <div className="px-5">
        <div className="d-flex justify-content-between align-items-center ">
          <h4 className="fw-bold mb-3">{props.heading}</h4>
          <h6 className="text-primary hc">
            View more <AiOutlineRight />
          </h6>
        </div>
        <Row gutter={10}>
          {/* <Col
            xs={20}
            sm={12}
            md={8}
            lg={6}
            className="mb-2 d-flex align-items-center"
          > */}
          {adDetails
            ? adDetails.map((v, i) => {
                console.log(v);
                return (
                  <Col
                    xs={20}
                    sm={12}
                    md={8}
                    lg={6}
                    className="mb-2 d-flex align-items-center"
                  >
                    <AdCard
                      title={v.adTitle}
                      imgURL={v.imgURL}
                      price={v.price}
                    />
                  </Col>
                );
              })
            : null}
          {/* <AdCard
              // price={16500}
              price={props.price}
              // title="oppo F1s 4+64 memory 03328379945"
              title={props.title}
              days="fixed days ago"
              // imgURL="https://images.olx.com.pk/thumbnails/375596609-240x180.webp"
              imgURL={props.imgURL}
            /> */}
          {/* </Col> */}
        </Row>
      </div>
    </>
  );
};

export default CatCards;
