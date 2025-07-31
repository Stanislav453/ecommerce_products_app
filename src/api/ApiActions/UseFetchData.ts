import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../apiUrl";

export const useFetchData = <T>(params: string, id?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get<T>(
          `${API_URL}${params}${id ?? ""}`
        );
        setData(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
          console.error(error.response);
        } else {
          setError("An unexpected error occurred");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, id]);

  return { data, loading, error };
};
