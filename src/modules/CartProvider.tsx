import React, { createContext, useReducer } from "react";
import { CartContextType } from "../type";
import { CartReducer } from "./CartReducer";

type ContextProviverProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => {},
});

export const CartProvider = ({ children }: ContextProviverProps) => {
  const [cart, dispatch] = useReducer(CartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
