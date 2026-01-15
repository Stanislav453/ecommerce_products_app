import { useGetCategories } from "../../querys/useGetCategories/useGetCategories";
import { ShopFilterController } from "./ShopFilterView";

export const ShopFilterContainer = () => {
  const { data, error } = useGetCategories();

  if (error) {
    console.error("Something is wrong", error);
    return <p className="text-red-600">Error loading categories</p>;
  }

  if (data === undefined) return null;

  return <ShopFilterController categories={data} />;
};
