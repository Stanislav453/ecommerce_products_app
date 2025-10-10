import { Category } from "../../type";

interface ShopFilterFetcherProps {
  setselectedValue: (category: Category) => void;
}

const shopListCategory = [
  Category.All,
  Category.Beauty,
  Category.Fragrances,
  Category.Furniture,
  Category.Groceries,
];

export const ShopFilter = ({ setselectedValue }: ShopFilterFetcherProps) => {
  return (
    <select
      name="category-filter"
      onChange={(e) => setselectedValue(e.target.value as Category)}
    >
      <option value="">category</option>
      {shopListCategory.map((category: Category, index: number) => {
        return (
          <option key={index} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
};
