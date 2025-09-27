import axios from "axios";
import React from "react";

export const putData = () => {
  const tryPut = async () => {
    try {
      const response = await axios.put("https://dummyjson.com/products/1", {
        title: "Karol",
      });
      console.log(response.status);
      console.log(response.data);
    } catch (error) {
      console.log("Something is wrong", error);
    }
  };

  tryPut();

  return <div></div>;
};

