

import { Category } from "../../../type";
import { API_URL } from "../../apiUrl";

export const setCategoryUrl = (category: Category) => {
  const params = "?select=id,title,thumbnail,price,rating";
  const url =
    category === "all"
      ? `${API_URL}${params}`
      : `${API_URL}/category/${category}${params}`;

  return url;
};
