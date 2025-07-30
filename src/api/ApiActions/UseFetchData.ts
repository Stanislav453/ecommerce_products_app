import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../apiUrl";

export const UseFetchData = <T>(params: string, id?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get<T>(
          `${API_URL}${params}${id ?? ""}`
        );
        setData(response);        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, id]);

  return { data, loading };
};
