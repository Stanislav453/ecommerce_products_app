import axios from "axios";
import { Category, ProductView } from "./type";
import { setCategoryUrl } from "./setCategoryUrl";

export const getProductsCategory = async (
  category: Category
): Promise<ProductView[]> => {
  const url = setCategoryUrl(category);

  const response = await axios.get(url);

  return response.data.products;
};
