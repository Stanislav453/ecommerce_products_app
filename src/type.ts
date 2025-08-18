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
  Description = "description",
  Reviews = "reviews"
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
