import { NavigateFunction } from "react-router-dom";
import { Category } from "../../type";

type selectCategoryHandlerProps = {
  navigate: NavigateFunction;
  e: React.ChangeEvent<HTMLSelectElement>;
};

export const selectCategoryHandler = ({
  navigate,
  e,
}: selectCategoryHandlerProps) => {
  const value = e.target.value as Category;

  if (value === "all") {
    navigate("/shop");
  } else {
    navigate(`/shop/category/${value}`);
  }
};
