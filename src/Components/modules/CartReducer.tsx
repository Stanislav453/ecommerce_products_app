import { CartAction, CartItem } from "../../type";

export const cartReducer = (
  state: CartItem[],
  action: CartAction
): CartItem[] => {
  switch (action.type) {
    case "Add":
      return [...state, action.product];

    case "Remove":
      return state.filter((item) => item.id !== action.id);

    case "Increase":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case "Decrease":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    default:
      return state;
  }
};
