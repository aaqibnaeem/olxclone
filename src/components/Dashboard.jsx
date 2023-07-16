import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import MainCategory from "./MainCategory";
import { Button, Layout, Menu, theme } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import { BsSegmentedNav } from "react-icons/bs";
import { TbBinaryTree } from "react-icons/tb";
import NotFound from "./NotFound";
import SubCategory from "./SubCategory";

const { Header, Sider, Content } = Layout;

let Dashboard = () => {
  document.title = "Dashboard";
  const navigate = useNavigate();
  let [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sider>
          {collapsed ? (
            <div
              className="d-flex align-items-center justify-content-center text-white fs-6 fw-bold"
              style={{ height: "64px" }}
            >
              Olx
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center text-white fs-3 fw-bold"
              style={{ height: "64px" }}
            >
              Olx
            </div>
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <BsSegmentedNav />,
                label: "Main Category",
                onClick: () => navigate("MainCategory"),
              },
              {
                key: "2",
                icon: <TbBinaryTree />,
                label: "Sub Category",
                onClick: () => navigate("SubCategory"),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                padding: "0 8px",
              }}
            >
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 40,
                  height: 40,
                }}
                className="d-flex align-items-center justify-content-center"
              />
              <Button
                type="text"
                icon={<LogoutOutlined />}
                // onClick={logOut}
                style={{
                  fontSize: "16px",
                  width: 40,
                  height: 40,
                }}
                className="d-flex align-items-center justify-content-center"
              />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 90 + "vh",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<MainCategory />}></Route>
              <Route path="MainCategory" element={<MainCategory />}></Route>
              <Route path="SubCategory" element={<SubCategory />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Dashboard;
