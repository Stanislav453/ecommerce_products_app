import { type ChangeEvent } from "react";
import { Category } from "../../type";

interface CategoryFilter {
  selectedValue: Category;
  onChange: (value: Category) => void;
}

  const shopListCategory = [
    Category.all,
    Category.beauty,
    Category.fragrances,
    Category.furniture,
    Category.groceries,
  ];

export const CategoryFilter = ({ selectedValue, onChange }: CategoryFilter) => (
    <select value={selectedValue} name="category-filter" onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as Category)}>
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