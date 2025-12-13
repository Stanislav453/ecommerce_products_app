import React, { createContext, useReducer, } from "react";
import { CartReducer } from "./CartReducer";
import { CartContextType } from "../type";


type ContextProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => {},
});


export const CartProvider = ({ children }: ContextProviderProps)=> {
  const [cart, dispatch] = useReducer(CartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>
  );
};
