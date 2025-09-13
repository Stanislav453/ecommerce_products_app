import axios, { AxiosError } from "axios";
import { API_URL } from "../../apiUrl";

type FetchDataProps<T> = {
  path: string;
  setData: (args: T | null) => void;
  setError: (args: AxiosError) => void;
  setLoading: (args: boolean) => void;
};

export const fetchData = async <T>({
  path,
  setData,
  setError,
  setLoading,
}: FetchDataProps<T>) => {
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
