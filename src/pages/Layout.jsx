import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="container py-5">
    <Outlet />
  </div>
);