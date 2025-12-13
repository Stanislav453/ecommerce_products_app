import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { CartContextType } from "../type";

/**
 * ✅ FIXED: Changed from ContextProviverProps to ContextProviderProps
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original type name was: type ContextProviverProps
 *
 * PROBLEMS:
 * 1. Typo: "Proviver" should be "Provider"
 * 2. Confusing: Makes code harder to read and understand
 * 3. Unprofessional: Typos in code reduce trust and readability
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Correct spelling: "Provider" matches the component name (CartProvider)
 * - Clear and readable
 * - Follows naming conventions
 *
 * LEARN MORE:
 * - TypeScript types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 * - Naming conventions: https://google.github.io/styleguide/tsguide.html#naming
 */
type ContextProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  dispatch: () => {},
});

export const CartProvider = ({ children }: ContextProviderProps) => {
  const [cart, dispatch] = useReducer(CartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
