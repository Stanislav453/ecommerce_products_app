import React from "react";
import { Link, NavLink, Outlet } from "react-router";

export const Navigation = () => {
  return (
    <>
      <div>
        <a href="/">Glowzy</a>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/Blog">Blog</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
