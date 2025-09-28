import axios from "axios";
import { API_URL } from "./apiUrl";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return response;
};
