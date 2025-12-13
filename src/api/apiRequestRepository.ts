import axios from "axios";
import { Category, Product, ProductSummary, ProductView } from "../type";
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

export const getProducts = async (): Promise<Product> => {
  const response = await axios.get(API_URL);

  // ✅ FIXED: Changed from response.data.prodct to response.data.products
  //
  // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
  // The original code had: return response.data.prodct;  // ❌ Typo: "prodct" instead of "products"
  //
  // PROBLEMS:
  // 1. Typo: "prodct" is not a valid property name
  // 2. Runtime error: Accessing undefined property returns undefined
  // 3. Type error: Function promises to return Product but returns undefined
  // 4. Silent failure: The error might not be obvious until the function is actually used
  //
  // WHY THE NEW IMPLEMENTATION WORKS:
  // - Uses correct property name: "products" (matches API response structure)
  // - Returns the actual data from the API
  // - Type-safe: Matches the Promise<Product> return type
  //
  // LEARN MORE:
  // - API integration: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs
  // - Error handling: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
  return response.data.products;
};

export const getProductsCategory = async (
  category: Category
): Promise<ProductView[]> => {
  const url = setCategoryUrl(category);

  const response = await axios.get(url);

  return response.data.products;
};
