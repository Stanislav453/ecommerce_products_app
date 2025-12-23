import { CalcProductType, CartItem } from "../../type";

export const calcProduct = (cart: CartItem[]): CalcProductType => {
  let itemsCount = 0;
  let subTotal = 0;

  for (const product of cart) {
    const { price, quantity } = product;
    const productPrice = Number(price);
    const productQuantity = Number(quantity);

    itemsCount += productQuantity;
    subTotal += productPrice * productQuantity;
  }

  return { itemsCount, subTotal: Math.round(subTotal * 100) / 100 };
};
