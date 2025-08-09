import type { Category } from "../../type";

interface selectedValueProps {
  params?: string | null;
  id?: string | null;
  selectedValue?: Category | null;
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
  } else if (id) {
    fetchURL = `/products/${id}?select=id,title,images,price,rating,description,category,tags,reviews`;
  } else if (params) {
    fetchURL = `${params}`;
  }

  return fetchURL;
};
