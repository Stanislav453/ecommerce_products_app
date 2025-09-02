import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../apiUrl";

const FetchVariant = {
  Products: "products",
  product: "product",
  Categories: "categories",
  Category: "category",
  Query: "query",
} as const;

type ProductQuery = "" | "/?select=id,title,thumbnail,price,rating,description";

type CategoryQuery =
  | ""
  | "/?select=id,title,images,price,rating,description,category,tags,reviews";

type CategoriesQuery = "";

type DetailQuery =
  | ""
  | "/?select=id,title,images,price,rating,description,category,tags,reviews";

type CategoryNames = "beauty" | "fragrances" | "furniture" | "groceries";

type FetchProps =
  | { kind: typeof FetchVariant.Products; query: ProductQuery }
  | { kind: typeof FetchVariant.Categories; query: CategoriesQuery }
  | {
      kind: typeof FetchVariant.Category;
      name: CategoryNames;
      query: CategoryQuery;
    }
  | { kind: typeof FetchVariant.product; id: string; query: DetailQuery };

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
    case FetchVariant.product:
      path = args.id;
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
