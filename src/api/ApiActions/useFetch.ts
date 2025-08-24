import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import axios, { AxiosError } from "axios";
import { Category } from "../../type";
import { API_URL } from "../apiUrl";

type KNDoptions = "category" | "categories" | "detail" | "query";

interface FetchProps {
  kind: KNDoptions;
}

export const useFetch = async <T>({ kind }: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  // useEffect(() => {
  try {
    const { data: response } = await axios.get<T>(`${API_URL}`);
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
    // }  }, [params, id, selectedValue]);

    return { data, loading, error };
  }
};
