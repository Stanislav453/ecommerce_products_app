import { useLocation } from "react-router-dom";
import { Category } from "../type";

export const useLoadPathname = () => {
  const { pathname } = useLocation();

  let currentPath: Category = "all";

  if (pathname === "/shop") {
    currentPath = "all";
  } else {
    currentPath = pathname.split("/").at(-1) as Category;
  }

  return currentPath;
};
