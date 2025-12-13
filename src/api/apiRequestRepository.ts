import axios from "axios";
import { Category, Product, ProductSummary, ProductView } from "../type";
import { setCategoryUrl } from "./setCategoryUrl";
import { API_URL } from "./apiUrl";

export const getProduct = async (id: string): Promise<ProductSummary> => {
  const response = await axios.get(
    `${API_URL}/${id}?select=images,tags,category,rating,price,thumbnail,title,reviews,description`
  );

  return response.data;
};

export const getProducts = async (): Promise<Product> => {
  const response = await axios.get(API_URL);

  return response.data.prodct;
};

export const getProductsCategory = async (
  category: Category
): Promise<ProductView[]> => {
  const url = setCategoryUrl(category);

  const response = await axios.get(url);

  return response.data.products;
};
