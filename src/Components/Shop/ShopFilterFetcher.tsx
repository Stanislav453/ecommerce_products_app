import { Category } from "../../type";

interface ShopFilterFetcherProps {
  setselectedValue: (category: Category) => void;
}

export const ShopFilterFetcher = ({
  setselectedValue,
}: ShopFilterFetcherProps) => {
  const shopListCategory = [
    Category.All,
    Category.Beauty,
    Category.Fragrances,
    Category.Furniture,
    Category.Groceries,
  ];

  return (
    <select
      name="category-filter"
      onChange={(e) => setselectedValue(e.target.value as Category)}
    >
      <option value="">Please filter category</option>
      {shopListCategory.map((category: string, index: number) => {
        return (
          <option key={index} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
};
