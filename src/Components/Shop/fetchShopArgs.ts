import { Category, ProductSummaryResponse } from "../../type";
import {
  getSummuryProducts,
  getSummuryProductsCategory,
} from "../../api/shopApiCalls";


export const fetchShopArgs = (
  selectedValue: Category
): Promise<ProductSummaryResponse> => {
  return selectedValue === Category.All
    ? getSummuryProducts()
    : getSummuryProductsCategory(selectedValue);
};
