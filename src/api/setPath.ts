import { FetchOptions, FetchVariant } from "../type";

export const setPath = (args: FetchOptions) => {
  let path = "";
  switch (args.kind) {
    case FetchVariant.Products:
      path = "";
      break;
    case FetchVariant.Categories:
      path = FetchVariant.Categories;
      break;
    case FetchVariant.Category:
      path = `${FetchVariant.Category}/${args.name}`;
      break;
    case FetchVariant.product:
      path = args.id;
      break;
    default:
      throw new Error("Missing corectly endpoint");
  }

  return { path };
};
