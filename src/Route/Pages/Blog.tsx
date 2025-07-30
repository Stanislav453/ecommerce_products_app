import React from "react";
import { UseFetchData } from "../../api/ApiActions/UseFetchData";

export const Blog = () => {
  // fetch("https://dummyjson.com/products/1")
  //   .then((res) => res.json())
  //   .then(console.log);

  const { data } = UseFetchData("/product/1")

  


  return <div>Blog</div>;
};
