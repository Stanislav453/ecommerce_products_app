import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoBagOutline,
  IoAppsSharp,
} from "react-icons/io5";
import { Footer } from "../footer/Footer";
import { CartContainer } from "../cart/CartContainer";
import { CartContext } from "../modules/CartContext";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(true);

  const navActive = isActive ? "top-[65px]" : "top-[-350px]";

  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, product) => {
    return Number(product.quantity) + sum;
  }, 0);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className=" w-full max-w-screen-xl flex justify-between items-center py-5 px-3">
          <NavLink className="font-bold text-2xl" to="/">
            Glowzy.
          </NavLink>
          <button onClick={() => setIsActive(!isActive)} className="sm:hidden ">
            <IoAppsSharp className="text-[2rem]" />
          </button>
          <nav
            className={`absolute ${navActive} sm:relative sm:top-0 z-50 w-full left-0 sm:flex gap-5 sm:justify-end bg-page-sections sm:bg-white transition-[top] duration-300`}
          >
            <ul className="flex flex-col text-center sm:flex-row sm:gap-3">
              <li>
                <NavLink
                  className="block w-full py-3 border-t-2 sm:border-0 "
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block w-full py-3 border-t-2 sm:border-0 "
                  to="/Shop"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block w-full py-3 border-t-2 sm:border-0 "
                  to="/Blog"
                >
                  Blog
                </NavLink>
              </li>
            </ul>
            <ul className="flex justify-center gap-3 border-t-2 sm:border-0 ">
              <li className="flex">
                <button className="p-3 sm:p-0">
                  <IoSearchOutline />
                </button>
              </li>
              <li className="flex">
                <button className="p-3 sm:p-0">
                  <IoPersonOutline />
                </button>
              </li>
              <li className="flex">
                <button
                  onClick={() => setIsCartActive(true)}
                  className="p-3 sm:p-0"
                >
                  <IoBagOutline />
                  {cartCount > 0 && (
                    <p className="absolute top-0 right-[-14px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </p>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <CartContainer
        isCartActive={isCartActive}
        setIsCartActive={setIsCartActive}
      />
      <Outlet />
      <Footer />
    </>
  );
};
