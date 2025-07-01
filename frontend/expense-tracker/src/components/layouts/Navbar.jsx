import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200 p-4">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-semibold text-black">Expense Tracker - {activeMenu}</h2>

      {openSideMenu && (
        <div className="absolute top-16 left-0 z-50 w-64 h-full bg-white shadow-lg lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
