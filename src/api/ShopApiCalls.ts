import axios from "axios";
import { ProductDetailResponse, ProductSummaryResponse } from "../type";

export const getSummuryProducts = async (): Promise<ProductSummaryResponse> => {
  return (
    await axios.get(
      "https://dummyjson.com/products?select=title,price,rating,thumbnail"
    )
  ).data;
};

export const getProductDetail = async (
  id: string | null
): Promise<ProductDetailResponse> => {
  return (
    await axios.get(
      `https://dummyjson.com/products/${id}?select=id,title,images,price,rating,description,category,tags,reviews`
    )
  ).data;
};
