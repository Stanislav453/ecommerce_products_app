import { Category, ProductSummaryResponse } from "../../type";
import {
  getSummuryProducts,
  getSummuryProductsCategory,
} from "../../api/shopApiCalls";

type FetchArgsProps = {
  selectedValue: Category;
};

export const fetchShopArgs = ({ selectedValue }: FetchArgsProps) => {
  const args: Promise<ProductSummaryResponse>  =
    selectedValue === Category.All
      ? getSummuryProducts()
      : getSummuryProductsCategory(selectedValue);

  return { args };
};
