import axios, { AxiosError } from "axios";
import { API_URL } from "../apiUrl";
import type { Category } from "../../type";
import { selectedVariant } from "./selectedVariant";

interface fetchDataProps<T> {
  setData: (response: T | null) => void;
  setLoading: (state: boolean) => void;
  setError: (error: AxiosError) => void;
  params?: string;
  id?: string;
  selectedValue?: Category;
}

export const fetchData = async <T>({
  setData,
  setLoading,
  setError,
  params,
  id,
  selectedValue,
}: fetchDataProps<T>) => {
  const fetchURL = selectedVariant({ params, id, selectedValue });

  console.log("This is selectedValue", selectedValue);
  console.log("This is patams", params);
  console.log("This is id", id);

  try {
    const { data: response } = await axios.get<T>(`${API_URL}${fetchURL}`);
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
