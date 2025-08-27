import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import axios, { AxiosError } from "axios";
import { Category } from "../../type";
import { API_URL } from "../apiUrl";

const QueryVariant = {
  product: "",
  productDetail: ""

} as const

const FetchVariant = {
  Products: "products",
  Categories: "categories",
  Category: "category",
  Detail: "detail",
  Query: "query",
} as const;

type CategoryNames = "beauty" | "fragrances" | "furniture" | "groceries";

type FetchProps =
  | { kind: typeof FetchVariant.Products }
  | { kind: typeof FetchVariant.Categories }
  | { kind: typeof FetchVariant.Category; name: CategoryNames }
  | { kind: typeof FetchVariant.Detail; id: string }
  | { kind: typeof FetchVariant.Query; query: string };

export const useFetch = <T>(args: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  let path = "";
  switch (args.kind) {
    case FetchVariant.Products:
      path = "";
      break;
    case FetchVariant.Categories:
      path = FetchVariant.Categories;
      break;
    case FetchVariant.Category:
      path = `${FetchVariant.Category}/${args.name}`;
      break;
    case FetchVariant.Detail:
      path = args.id;
      break;
    case FetchVariant.Query:
      path = args.query;
      break;
    default:
      throw new Error("Missing corectly endpoint");
  }

  const fetchData = async (path: any) => {
    try {
      const { data: response } = await axios.get<T>(
        `${API_URL}/products/${path}`
      );
      setData(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        setError(error);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(path);
  }, []);

  return { data, loading, error };
};
