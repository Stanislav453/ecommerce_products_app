import React, { useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { CartContext } from "./CartContext";
import { loadCartFromStorage, saveCartToStorage } from "./cartStorage";

type ContextProviverProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: ContextProviverProps) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () =>
    loadCartFromStorage()
  );

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
