import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../apiUrl";
import { useProducts } from "../../Store/useProducts";
import { useError } from "../../Store/useError";

export const FetchProducts = () => {
  const updateProducts = useProducts((state) => state.setProducts);
  const updateError = useError((state) => state.setApiError);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const data = response.data;
        updateProducts(data.products);
      } catch (e: any) {
        console.log(e.message);
        updateError(e.message);
      }
    };

    getData();
  }, []);
};
