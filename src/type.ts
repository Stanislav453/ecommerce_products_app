export interface Reviews {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
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

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
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
