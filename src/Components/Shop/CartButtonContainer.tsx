import { useContext } from "react";
import { CartContext } from "../modules/CartContext";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { ProductView } from "../../type";

type CartButtonContainerProps = {
  product: ProductView;
  isRemoveItem?: boolean;
};

const CartButtonContainer = ({
  product,
  isRemoveItem,
}: CartButtonContainerProps) => {
  const { dispatch, cart } = useContext(CartContext);

  const cartItem = cart.find((item) => item.id === product.id);

  return cartItem ? (
    <div>
      <div className="flex justify-between text-4xl sm:text-xl font-semibold p-2 bg-slate-500 rounded-full">
        <button onClick={() => dispatch({ type: "Increase", id: product.id })}>
          <CiCirclePlus />
        </button>
        <p className="text-2xl sm:text-xl ">{cartItem.quantity}</p>
        <button onClick={() => dispatch({ type: "Decrease", id: product.id })}>
          <CiCircleMinus />
        </button>
      </div>
      {isRemoveItem && (
        <button
          className="border-b border-black"
          onClick={() => dispatch({ type: "Remove", id: product.id })}
        >
          Remove item
        </button>
      )}
    </div>
  ) : (
    <button
      className="w-full py-2 border-[1px] border-black rounded-full"
      onClick={() =>
        dispatch({
          type: "Add",
          product: { ...product, quantity: 1 },
        })
      }
    >
      Add to cart
    </button>
  );
};

export default CartButtonContainer;
