interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Reviews {
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

export enum Category {
  All = "All",
  beauty = "beauty",
  fragrances = "fragrances",
  furniture = "furniture",
  groceries = "groceries",
}

export interface ProductSummary {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  description: string;
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
  reviews: Reviews[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta[];
  images: string[];
}

export interface ProductDetailResponse extends ProductSummary {
  tags: string[];
  category: Category;
}

export interface Order {
  name: string;
  price: number;
  desc: string;
}
