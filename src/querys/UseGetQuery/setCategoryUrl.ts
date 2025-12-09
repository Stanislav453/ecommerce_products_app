import { API_URL } from "../../api/apiUrl";
import { Category } from "../../type";

export const setCategoryUrl = (category: Category) => {
  const params = "?select=id,title,thumbnail,price,rating";
  const url =
    category === "all"
      ? `${API_URL}${params}`
      : `${API_URL}/category/${category}${params}`;

  return url;
};
