import { useContext } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { CartContext } from "../modules/CartContext";
import { CartItem } from "../../type";
import CartButtonContainer from "../shop/CartButtonContainer";

type CartContainer = {
  isCartActive: boolean;
  setIsCartActive: (status: boolean) => void;
};

export const CartContainer = ({
  isCartActive,
  setIsCartActive,
}: CartContainer) => {
  const active = isCartActive ? "w-full sm:w-96" : "w-0 overflow-hidden";

  const { cart } = useContext(CartContext);

  const subTotal =
    Math.round(
      cart.reduce((sum, product) => {
        return sum + Number(product.price) * Number(product.quantity);
      }, 0) * 100
    ) / 100;

  const cartItems = cart.reduce((sum, product) => {
    return Number(product.quantity) + sum;
  }, 0);

  return (
    <aside
      className={`fixed top-0 right-0 ${active} z-50 bg-block-color h-full shadow-black shadow-xl transition-all  overflow-y-auto`}
    >
      <div className="flex justify-end">
        <button className="p-2" onClick={() => setIsCartActive(false)}>
          <FaRegTimesCircle className="w-[2.1875rem] h-[2.1875rem] " />
        </button>
      </div>
      <p className="text-xl font-bold p-4">Your cart (items: {cartItems})</p>
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
      </ul >
      <div className=" sticky bottom-0 right-0 z-50 w-full px-4 py-8 bg-white">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Subtotal</h2>
          <p className="text-2xl font-semibold text-gray-600">${subTotal}</p>
        </div>
        <p className="my-3">Shipping and discounts calculated at checkout.</p>
        <div className="flex  gap-4">
          <button className=" text-xl border-2 border-black p-2 rounded-xl">
            View my cart
          </button>
          <button className=" text-xl text-white p-2 border-2 rounded-xl bg-black">
            Go to checkout
          </button>
        </div>
      </div>
    </aside>
  );
};
