import axios from "axios";
import { Category, ParamsType, UserReview } from "./type";

type FetchBuilderProps = {
  method: "POST" | "GET" | "PUT" | "DELETE";
  id?: string;
  category?: Category;
  body?: UserReview;
  params?: ParamsType;
};

export const fetchBuilder = async <T extends {}>({
  method,
  id,
  category,
  body,
  params,
}: FetchBuilderProps): Promise<T> => {
  const baseUrl = "https://dummyjson.com/products";
  const url = id
    ? `${baseUrl}/${id}`
    : category && category !== Category.All
    ? `${baseUrl}/category/${category}`
    : baseUrl;

  console.log("This is fetchBuilder", baseUrl);

  if (!url) throw new Error("URL is invalid");

  const response = await axios.request<T>({
    method,
    url,
    ...(method === "POST" || method === "PUT" ? { data: body } : {}),
    params,
  });

  return response.data;
};
