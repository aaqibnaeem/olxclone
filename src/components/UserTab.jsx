import React from "react";
import { Dropdown } from "react-bootstrap";
import { GrDown } from "react-icons/gr";

let UserTab = (props) => {
  return (
    <div className="d-flex align-items-center">
      <div className="mx-2 hc">
        <img
          style={{ maxWidth: "50px" }}
          src="https://www.olx.com.pk/assets/iconChat_noinline.31f5df4a6a21fc770ed6863958662677.svg"
          alt="chat"
        />
      </div>
      <div className="mx-2 hc">
        <img
          style={{ maxWidth: "50px" }}
          src="https://www.olx.com.pk/assets/iconNotifications_noinline.4444f6b42acbe30d772d80ef1225f574.svg"
          alt="chat"
        />
      </div>
      <div className="hc">
        <Dropdown>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="rounded-0 bg-transparent border-0"
          >
            <img
              style={{ width: "35px" }}
              src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={props.handleLogout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <img
          style={{ maxWidth: "35px" }}
          src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
          alt="chat"
          className="me-1"
        />
        <GrDown /> */}
      </div>
    </div>
  );
};

export default UserTab;
