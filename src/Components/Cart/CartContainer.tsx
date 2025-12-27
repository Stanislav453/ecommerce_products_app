import { useContext, useMemo } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { CartContext } from "../modules/CartContext";
import CartItems from "./CartItems";
import { calcProduct } from "./calcProduct";
import TotalPriceCard from "./TotalPriceCard";

export const CartContainer = () => {
  const { isCartActive, setIsCartActive } = useContext(CartContext);

  const active = isCartActive ? "w-full sm:w-96" : "w-0 overflow-hidden";

  const { cart } = useContext(CartContext);

  const calcProductMemo = useMemo(() => {
    return calcProduct(cart);
  }, [cart]);

  const { itemsCount, subTotal } = calcProductMemo;

  return (
    <aside
      className={`fixed top-0 right-0 ${active} z-50 bg-block-color h-full shadow-black shadow-xl transition-all  overflow-y-auto`}
    >
      <div className="flex justify-end">
        <button className="p-2" onClick={() => setIsCartActive(false)}>
          <FaRegTimesCircle className="w-[2.1875rem] h-[2.1875rem] " />
        </button>
      </div>
      <p className="text-xl font-bold p-4">Your cart (items: {itemsCount})</p>
      <CartItems cart={cart} />
      <TotalPriceCard subTotal={subTotal} />
    </aside>
  );
};
