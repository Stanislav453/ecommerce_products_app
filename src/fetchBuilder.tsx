import axios from "axios";
import { FetchOptions } from "./type";
import { fetchpath } from "./fetchPath";

export const fetchBuilder = async <T extends {}>(options: FetchOptions) => {
  const { path } = fetchpath(options);

  console.log("This is path from FETCHBUILDER",path);
  

  const response = await axios.request<T>({
    method: options.method,
    url: path,
    ...(options.method === "POST" || options.method === "PUT"
      ? { data: options.body }
      : {}),
  });

  return response.data;
};
