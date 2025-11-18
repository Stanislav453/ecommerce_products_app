import { FetchOptions } from "./type";
import { API_CALS_PRODUCT } from "./API_CALS";

export const fetchpath = (options: FetchOptions) => {
  let path = "";
  switch (options.method) {
    case "GET":
      if (options.variant === "product") {
        path = `${API_CALS_PRODUCT}/${options.id}${
          options.params ? `?${options.params}` : ""
        }`;
      } else if (options.variant === "category") {
        if (options.categoryName === "all") {
          path = `${API_CALS_PRODUCT}${
            options.params ? `?${options.params}` : ""
          }`;
        } else {
          path = `${API_CALS_PRODUCT}/category/${options.categoryName}${
            options.params ? `?${options.params}` : ""
          }`;
        }
      } else if (options.variant === "products") {
        path = `${API_CALS_PRODUCT}${
          options.params ? `?${options.params}` : ""
        }`;
      }
      break;
    case "POST":
      path = `${API_CALS_PRODUCT}/add`;
      break;
    case "PUT":
      path = `${API_CALS_PRODUCT}/${options.id}`;
      break;
    case "DELETE":
      path = `${API_CALS_PRODUCT}/${options.id}`;
      break;
    default:
      throw new Error("Missing corectly endpoint");
  }

  return { path };
};
