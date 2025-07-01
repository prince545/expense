import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />
      <div className="flex flex-1">
        <SideMenu activeMenu={activeMenu} />
        <main className="flex-1 p-5 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
