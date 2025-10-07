import React from "react";
import { NavLink } from "react-router-dom";

export const ApiCallError = () => {
  return (
    <div className="flex flex-col w-full items-center mt-28">
      <p className="text-red-600">Something is wrong.</p>
      <p>
        Please go to
        <NavLink to="/" className="font-bold underline	">
          Home
        </NavLink>
        and try it later.
      </p>
    </div>
  );
};

