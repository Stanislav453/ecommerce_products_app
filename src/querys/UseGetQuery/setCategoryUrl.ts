import { API_URL } from "../../api/apiUrl";
import { Category } from "../../type";

export const setCategoryUrl = (category: Category, skip: number) => {
  const pageSize = 20;

  const search = new URLSearchParams({
    select: "?select=id,title,thumbnail,price,rating",
    limit: String(pageSize),
    skip: String(skip),
  });

  const url =
    category === "all" ? `${API_URL}` : `${API_URL}/category/${category}`;

  return `${url}?${search.toString()}`;
};
