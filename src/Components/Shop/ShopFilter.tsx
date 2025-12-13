import { Category } from "../../type";

interface ShopFilterFetcherProps {
  setselectedValue: (category: Category) => void;
  currentValue: Category;
}

/**
 * ✅ FIXED: Added currentValue prop to sync select with URL state
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original select didn't have a value prop, so it didn't reflect the current category from URL.
 *
 * PROBLEMS:
 * 1. Select doesn't show current category: If URL has ?category=beauty, select shows empty/default
 * 2. Not controlled: Select value doesn't sync with URL state
 * 3. Poor UX: User can't see what category is currently selected
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Controlled component: value prop syncs with URL state
 * - Shows current category: Select displays the category from URL
 * - Better UX: User can see what filter is active
 *
 * LEARN MORE:
 * - Controlled components: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
 * - Form elements: https://react.dev/learn/managing-state#controlled-components
 */
export const ShopFilter = ({ setselectedValue, currentValue }: ShopFilterFetcherProps) => {
  return (
    <select
      name="category-filter"
      value={currentValue}
      onChange={(e) => setselectedValue(e.target.value as Category)}
      aria-label="Filter products by category"
    >
      <option value="all">All Categories</option>
      <option value="beauty">Beauty</option>
      <option value="fragrances">Fragrances</option>
      <option value="furniture">Furniture</option>
      <option value="groceries">Groceries</option>
    </select>
  );
};
