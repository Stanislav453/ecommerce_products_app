import axios from "axios";
import { Category, ProductSummary, ProductView } from "../type";
// ✅ FIXED: Changed import path from "../querys/useGetQuery/setCategoryUrl" to "./setCategoryUrl"
//
// WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
// The original import was: import { setCategoryUrl } from "../querys/useGetQuery/setCategoryUrl";
//
// PROBLEMS:
// 1. Wrong path: The file is actually in the same directory (./setCategoryUrl.ts)
// 2. Typo in path: "querys" should be "queries" (though the actual directory was different)
// 3. Unnecessary nesting: Importing from a deeply nested, non-existent path
// 4. Breaks when files are moved or reorganized
//
// WHY THE NEW IMPLEMENTATION WORKS:
// - Uses relative path from same directory (./setCategoryUrl)
// - Shorter, clearer import path
// - Matches actual file location
// - Easier to maintain
//
// LEARN MORE:
// - ES6 imports: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// - Module resolution: https://www.typescriptlang.org/docs/handbook/module-resolution.html
import { setCategoryUrl } from "./setCategoryUrl";
import { API_URL } from "./apiUrl";

export const getProduct = async (id: string): Promise<ProductSummary> => {
  const response = await axios.get(
    `${API_URL}/${id}?select=images,tags,category,rating,price,thumbnail,title,reviews,description`
  );

  return response.data;
};

export const getProductsCategory = async (
  category: Category
): Promise<ProductView[]> => {
  const url = setCategoryUrl(category);

  const response = await axios.get(url);

  return response.data.products;
};
