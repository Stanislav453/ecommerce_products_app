import { createContext } from "react";
import { CartContextType } from "../../type";

export const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => {},
});
