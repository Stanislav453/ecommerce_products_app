import React, { useReducer } from "react";
import { cartReducer } from "./CartReducer";
import { CartContext } from "./CartContext";

type ContextProviverProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: ContextProviverProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
