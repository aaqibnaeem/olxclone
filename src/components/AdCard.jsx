import { Card } from "antd";
import React from "react";

import { SlHeart } from "react-icons/sl";

let AdCard = (props) => {
  return (
    <div className="w-100">
      <Card
        cover={
          <img
            alt="example"
            src={props.imgURL}
            style={{
              width: "100%",
              objectFit: "cover",
              height: "170px",
              objectPosition: "center",
            }}
          />
        }
      >
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="fs-5 fw-bold m-1 p-0">{`Rs ${props.price}`}</p>
            <SlHeart className="fw-bold fs-5 me-2" />
          </div>
          <p className="m-1">{props.title}</p>
          <p className="m-1">{props.location}</p>
          <p className="m-1" style={{ fontSize: 12 }}>
            {props.days}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdCard;
