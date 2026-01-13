import { useGetCategories } from "../../querys/useGetCategories/useGetCategories";
import { Category, CategoryResponse } from "../../type";
import { useNavigate } from "react-router";

export const ShopFilterContainer = () => {
  const navigate = useNavigate();
  const { data } = useGetCategories();

  const selectCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Category;

    if (value === "all") {
      navigate("/shop");
    } else {
      navigate(`/shop/category/${value}`);
    }
  };

  return (
    <select
      className="border-2"
      name="category-filter"
      onChange={(e) => selectCategoryHandler(e)}
    >
      <option value="all">Category</option>
      <option value="all">All</option>
      {data &&
        data.map((category: CategoryResponse, index: number) => {
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
