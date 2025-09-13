import { ArgsOptions, Category } from "../../type";

type FetchArgsProps = {
  selectedValue: Category;
};

export const fetchArgs = ({ selectedValue }: FetchArgsProps) => {
  const args: ArgsOptions =
    selectedValue === Category.All
      ? {
          kind: "products",
          query: "?select=id,title,thumbnail,price,rating,description",
        }
      : {
          kind: "category",
          name: selectedValue,
          query: "?select=id,title,thumbnail,price,rating,description",
        };

  return { args };
};
