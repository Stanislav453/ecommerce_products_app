import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import type { AxiosError } from "axios";

export const useFetchData = <T>(params: string, id?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    fetchData({ setData, setLoading, setError, params, id });
  }, [params, id]);

  return { data, loading, error };
};
