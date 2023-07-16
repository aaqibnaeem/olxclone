import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import Dashboard from "../components/Dashboard";

let Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard/*" element={<Dashboard />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default Navigation;
