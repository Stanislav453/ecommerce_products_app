import { CategoryResponse } from "../../type";
import { useNavigate } from "react-router-dom";
import { selectCategoryHandler } from "./selectCategoryHandler";

type shopFilterViewProps = {
  categories: CategoryResponse[];
};

export const ShopFilterController = ({ categories }: shopFilterViewProps) => {
  const navigate = useNavigate();

  return (
    <select
      className="border-2"
      name="category-filter"
      onChange={(e) => selectCategoryHandler({ navigate, e })}
    >
      <option value="all">Category</option>
      <option value="all">All</option>
      {categories &&
        categories.map((category: CategoryResponse, index: number) => {
          const { slug, name } = category;
          return (
            <option key={index} value={slug}>
              {name}
            </option>
          );
        })}
    </select>
  );
};
