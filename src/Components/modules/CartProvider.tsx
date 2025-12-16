import React, { useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { CartContext } from "./CartContext";

type ContextProviverProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: ContextProviverProps) => {
  const [cart, dispatch] = useReducer(CartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
