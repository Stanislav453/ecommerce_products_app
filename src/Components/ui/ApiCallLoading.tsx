import React from "react";
import loadingSpinner from "../../../public/loadingSpinner.svg";

export const ApiCallLoading = () => {
  return (
    <div className="flex justify-center">
      <img className="w-11" src={loadingSpinner} alt="loadingSpinner" />
    </div>
  );
};
