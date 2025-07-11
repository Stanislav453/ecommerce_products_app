import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../apiUrl";
import { useProducts } from "../../Store/useProducts";

export const FetchProducts = () => {
  const updateProducts = useProducts((state: any) => state.setProducts);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const data = response.data;
        updateProducts(data.products);
      } catch (e: any) {
        console.log(e.message);
      } finally {
      }
    };

    getData();
  }, []);
};
