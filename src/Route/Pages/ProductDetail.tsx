import React from "react";
import { useLocation } from "react-router";

export const ProductDetail = () => {
  const location = useLocation();

  const name = location.state.name;
  const id = location.state.age ;

  return (
    <div>
      product detail
      <h2>{name}</h2>
      <h2>{id}</h2>
    </div>
  );
};
