interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Reviews {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export enum ProdNav {
  Description = "Description",
  Reviews = "Reviews",
}

export enum Category {
  All = "all",
  Beauty = "beauty",
  Fragrances = "fragrances",
  Furniture = "furniture",
  Groceries = "groceries",
}

export interface ProdDesc {
  description: string;
  reviews: Reviews[];
}

export interface ProductSummary extends ProdDesc {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
}
export interface ProductSummaryResponse {
  products: ProductSummary[];
}

export interface Product extends ProductSummary {
  description: string;
  category: Category;
  discountPercentage: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta[];
  images: string[];
}

export interface ProductDetailResponse extends ProductSummary {
  images: string;
  tags: string[];
  category: Category;
}

export interface Order {
  name: string;
  price: number;
  desc: string;
}

export const FetchVariant = {
  Products: "products",
  product: "product",
  Categories: "categories",
  Category: "category",
  Query: "query",
} as const;

export type ProductQuery =
  | ""
  | "?select=id,title,thumbnail,price,rating,description";

export type CategoryQuery =
  | ""
  | "?select=id,title,thumbnail,price,rating,description";

export type CategoriesQuery = "";

export type DetailQuery =
  | ""
  | "?select=id,title,images,price,rating,description,category,tags,reviews";

export type CategoryNames = "beauty" | "fragrances" | "furniture" | "groceries";

export type FetchProducts = {
  kind: typeof FetchVariant.Products;
  query: ProductQuery;
};
export type FetchProduct = {
  kind: typeof FetchVariant.product;
  id: string | null;
  query: DetailQuery;
};
export type FetchCategories = {
  kind: typeof FetchVariant.Categories;
  query: CategoriesQuery;
};
export type FetchCategory = {
  kind: typeof FetchVariant.Category;
  name: CategoryNames;
  query: CategoryQuery;
};

export type FetchOptions =
  | FetchProducts
  | FetchProduct
  | FetchCategories
  | FetchCategory;

export type ArgsOptions = FetchProducts | FetchCategory;

export type UserReview = {
  id: string;
  comment: string;
  author: string;
  email: string;
  saveUserInfo: boolean;
};
