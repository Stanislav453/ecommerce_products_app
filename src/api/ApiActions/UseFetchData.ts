import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import type { AxiosError } from "axios";
import type { Category } from "../../type";

export const useFetchData = <T>({
  params,
  selectedValue,
  id,
}: {
  params?: string;
  selectedValue?: Category;
  id?: string;
}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    fetchData({ setData, setLoading, setError, selectedValue, params, id });
  }, [params, id, selectedValue]);

  return { data, loading, error };
};
