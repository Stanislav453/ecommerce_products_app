import { Category } from "../../type";

interface ShopFilterFetcherProps {
  setselectedValue: (category: Category) => void;
  refetchCache: () => void
}

const shopListCategory = [
  Category.All,
  Category.Beauty,
  Category.Fragrances,
  Category.Furniture,
  Category.Groceries,
];

export const ShopFilter = ({
  setselectedValue,
  refetchCache
}: ShopFilterFetcherProps) => {
  return (
    <select
      name="category-filter"
      onChange={(e) => setselectedValue(e.target.value as Category)}
      onClick={ () => refetchCache() }
    >
      <option value="">category</option>
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
