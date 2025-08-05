import axios, { AxiosError } from "axios";
import { API_URL } from "../apiUrl";

interface fetchDataProps<T> {
  setData: (response: T | null) => void;
  setLoading: (state: boolean) => void;
  setError: (error: AxiosError) => void;
  params: string;
  id?: string;
}

export const fetchData = async <T>({
  setData,
  setLoading,
  setError,
  params,
  id,
}: fetchDataProps<T>) => {
  try {
    const { data: response } = await axios.get<T>(
      `${API_URL}${params}${id ?? ""}`
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
