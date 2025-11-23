import axios from "axios";
import { API_URL } from "./api/apiUrl";

export const getProduct = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response;
};
