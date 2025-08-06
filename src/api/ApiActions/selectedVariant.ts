import type { Category } from "../../type";

interface selectedValueProps {
  params?: string;
  id?: string;
  selectedValue?: Category;
}

export const selectedVariant = ({
  params,
  id,
  selectedValue,
}: selectedValueProps) => {
  let fetchURL = "";

  if (selectedValue) {
    if (selectedValue === "all") {
      fetchURL = `/products/?select=id,title,thumbnail,price,rating,description`;
    } else {
      fetchURL = `/products/category/${selectedValue}?select=id,title,thumbnail,price,rating,description`;
    }
  } else if (params && id) {
    fetchURL = `${params}${id}`;
  } else if (params) {
    fetchURL = `${params}`;
  }

  return fetchURL;
};
