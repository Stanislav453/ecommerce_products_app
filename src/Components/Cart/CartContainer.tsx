import { useContext } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { CartContext } from "../../features/CartProvider";
import { CartItem } from "../../type";

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

  return (
    <aside
      className={`fixed top-0 right-0 ${active} z-50 bg-block-color h-full shadow-black shadow-xl transition-all `}
    >
      <div className="flex justify-end">
        <button className="p-2" onClick={() => setIsCartActive(false)}>
          <FaRegTimesCircle className="w-[2.1875rem] h-[2.1875rem] " />
        </button>
      </div>
      <ul>
        {cart.map((item: CartItem, index) => {
          return <li key={index}>{item.title}</li>;
        })}
      </ul>
    </aside>
  );
};
