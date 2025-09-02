import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../apiUrl";

export const FetchVariant = {
  Products: "products",
  Categories: "categories",
  Category: "category",
  Detail: "detail",
} as const;

type CategoryNames = "beauty" | "fragrances" | "furniture" | "groceries";

type FetchProps =
  | { kind: typeof FetchVariant.Products }
  | { kind: typeof FetchVariant.Categories }
  | { kind: typeof FetchVariant.Category; name: CategoryNames }
  | { kind: typeof FetchVariant.Detail; id: string };

export const useFetch = <T>(args: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  const doFetch = async (path: string) => {
    try {
      const { data: response } = await axios.get<T>(
        `${API_URL}/products/${path}`
      );
      setData(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response);
        setError(err);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        path = `${args.id}`;
        break;
      default:
        const _never: never = args;
        throw new Error("Unknown kind");
    }

    doFetch(path);
  }, [args]);

  return { data, loading, error };
};
