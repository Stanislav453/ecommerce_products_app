import { CartAction, CartItem } from "../type";

export const CartReducer = (
  state: CartItem[],
  action: CartAction
): CartItem[] => {
  switch (action.type) {
    case "Add":
      return [...state, action.product];

    case "Remove":
      return state.filter((item) => item.id !== action.id);

    case "Increase":
      const IndexI = state.findIndex((p) => p.id === action.id);
      state[IndexI].quantity += 1;
      return [...state];

    case "Decrease":
      const IndexD = state.findIndex((p) => p.id === action.id);
      state[IndexD].quantity -= 1;
      return [...state];

    default:
      return state;
  }
};
