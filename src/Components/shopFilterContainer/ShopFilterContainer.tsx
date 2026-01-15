import { useGetCategories } from "../../querys/useGetCategories/useGetCategories";
import { ShopFilterController } from "./ShopFilterView";

export const ShopFilterContainer = () => {
  const { data } = useGetCategories();

  if (data === undefined) return null;

  return <ShopFilterController categories={data} />;
};
