import axios from "axios";
import {
  Category,
  CategoryResponse,
  Product,
  ProductPage,
  ProductSummary,
} from "../type";
import { setCategoryUrl } from "../querys/useGetQuery/setCategoryUrl";
import { API_URL } from "./apiUrl";

export const getProduct = async (id: string): Promise<ProductSummary> => {
  const response = await axios.get(
    `${API_URL}/${id}?select=images,tags,category,rating,price,thumbnail,title,reviews,description`
  );

  return response.data;
};

export const getProducts = async (skip: number): Promise<Product> => {
  const pageSize = 20;
  const response = await axios.get(`${API_URL}?limit=${pageSize}&skip=${skip}`);

  return response.data.prodct;
};

export const getProductsCategory = async (
  category: Category,
  skip: number
): Promise<ProductPage> => {
  const url = setCategoryUrl(category, skip);

  const response = await axios.get(url);

  return response.data;
};

export const getCategories = async (): Promise<CategoryResponse[]> => {
  const response = await axios.get(`${API_URL}/categoris?select=slug,name`);
  return response.data;
};
