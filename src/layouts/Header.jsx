import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between border-b-2 border-gray-300 py-2 items-center">
      <div className="flex gap-10">
        <img src="divar.svg" className="size-10" />
        <div className="flex gap-1 text-gray-500 text-sm items-center ">
          <img src="location.svg" className="size-6" />
          <p>اصفهان</p>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <Link to="/auth">
          <span className="flex text-sm gap-1 text-gray-500 items-center">
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link to="/dashboard">
          <p className="bg-rose-800 py-1 px-2 rounded-sm text-white ">ثبت آگهی</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
