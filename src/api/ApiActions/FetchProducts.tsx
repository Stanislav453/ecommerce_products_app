import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../apiUrl";
import { useProducts } from "../../Store/useProducts";

export const FetchProducts = () => {
  const updateProducts = useProducts((state) => state.setProducts);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const data = response.data;
        updateProducts(data.products);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.error(error.response);
        } else {
          console.error(error);
        }
      }
    };

    getData();
  }, []);
};
