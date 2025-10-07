import axios from "axios";
import { ProductSummaryResponse } from "../type";

export const getSummuryProducts = async (): Promise<ProductSummaryResponse> => {
  return (
    await axios.get(
      "https://dummyjson.com/products?select=title,price,rating,thumbnail"
    )
  ).data;
};
