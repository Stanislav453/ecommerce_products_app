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

export type Category =
  | "all"
  | "beauty"
  | "fragrances"
  | "furniture"
  | "groceries";

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
  category: Category;
  tags: string[];
  images: string[];
}

export type ProductView = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
};

export interface ProductSummaryResponse {
  products: ProductView[];
}

export interface Product extends ProductSummary {
  description: string;
  category: Category;
  discountPercentage: number;
  stock: number;
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
}

export interface ProductDetailResponse {
  products: ProductSummary;
}

export interface Order {
  name: string;
  price: number;
  desc: string;
}

export type UserReview = {
  id: string;
  comment: string;
  author: string;
  email: string;
  saveUserInfo: boolean;
};

export interface CartItem extends ProductView {
  quantity: number;
}

export type CartAction =
  | { type: "Add"; product: CartItem }
  | { type: "Remove"; id: string }
  | { type: "Increase"; id: string }
  | { type: "Decrease"; id: string };

export type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};


export type CalcProductType = {
  itemsCount: number;
  subTotal: number;
};