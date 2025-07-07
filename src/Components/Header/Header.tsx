import React from "react";
import { NavLink } from "react-router";
import headerBanner from "../../../public/header-banner.webp";

export const Header = () => {
  return (
    <header className="w-full flex justify-center bg-purple-100 py-20">
      <div className="w-full max-w-screen-lg flex items-center justify-between">
        <div className="flex flex-1 flex-col gap-3">
          <h2>SKINCARE</h2>
          <h1 className="font-bold text-5xl">
            Revitalize Your Skin and Combat Aging with Cutting-Edge Formulas
          </h1>
          <p className="text-2xl">
            Experience the power of innovative skincare designed to hydrate,
            brighten, and rejuvenate. Our advanced formulas deliver visible
            results, leaving your skin healthier and more radiant.
          </p>
          <div className="mt-3">
            <NavLink
              className="bg-black text-white px-4 py-2  rounded-full"
              to="/Shop"
            >
              Shop Now
            </NavLink>
          </div>
        </div>
        <div className="flex-1">
          <img src={headerBanner} alt="header_banner" />
        </div>
      </div>
    </header>
  );
};
