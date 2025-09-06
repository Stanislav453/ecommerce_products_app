import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { FetchOptions } from "../../type";
import { setPath } from "../setPath";
import { fetchData } from "./fetchData";

export const useFetch = <T>(args: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();
  const { path } = setPath(args);

  useEffect(() => {
    fetchData({ path, setData, setError, setLoading });
  }, [path]);

  return { data, loading, error };
};
