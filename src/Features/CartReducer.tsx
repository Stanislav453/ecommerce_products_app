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
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "Decrease":
      return state.map((item) => {
        if (item.id !== action.id) return item;
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          // Remove item if quantity reaches 0
          return null;
        }
        return { ...item, quantity: newQuantity };
      }).filter((item): item is CartItem => item !== null);

    default:
      return state;
  }
};
