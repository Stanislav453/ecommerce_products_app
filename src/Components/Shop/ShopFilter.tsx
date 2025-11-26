import { Category } from "../../type";

interface ShopFilterFetcherProps {
  setselectedValue: (category: Category) => void;
}

export const ShopFilter = ({ setselectedValue }: ShopFilterFetcherProps) => {
  return (
    <select
      name="category-filter"
      onChange={(e) => setselectedValue(e.target.value as Category)}
    >
      <option value="">category</option>
      <option value="all">all</option>
      <option value="beauty">beauty</option>
      <option value="fragrances">fragrances</option>
      <option value="furniture">furniture</option>
      <option value="groceries">groceries</option>
    </select>
  );
};
