import { CartItem } from "../../type";
import CartButtonContainer from "../shop/CartButtonContainer";

type CartItemsProps = {
  cart: CartItem[];
};

const CartItems = ({ cart }: CartItemsProps) => {
  return (
    <ul>
      {cart.map((product: CartItem, index) => {
        const { title, thumbnail, price, quantity } = product;

        const totalPrice = Math.round(price * quantity * 100) / 100;

        return (
          <li
            className="flex flex-1 justify-between gap-2 mt-5 px-2 border-b pb-7"
            key={index}
          >
            <div className="w-[100px]">
              <img src={thumbnail} alt={title} />
            </div>
            <div className="flex flex-col flex-2">
              <h3 className="font-bold">{title}</h3>
              <p>${price}</p>
              <div className=" w-40">
                <CartButtonContainer product={product} isRemoveItem={true} />
              </div>
            </div>
            <div className="flex-1 text-right font-bold text-gray-600">
              <p> ${totalPrice}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CartItems;
