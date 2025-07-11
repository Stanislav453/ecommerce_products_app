import { FetchProducts } from "../../api/ApiActions/FetchProducts";
import {  NavLink, Outlet } from "react-router";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoBagOutline,
} from "react-icons/io5";

export const Navigation = () => {
  FetchProducts();

  return (
    <>
      <div className="flex flex-col items-center">
        <div className=" w-full max-w-screen-lg flex justify-between py-5">
          <NavLink className="font-bold text-2xl" to="/">
            Glowzy.
          </NavLink>
          <nav className="flex gap-5">
            <ul className="flex gap-3">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/Blog">Blog</NavLink>
              </li>
            </ul>
            <ul className="flex gap-3">
              <li>
                <button>
                  <IoSearchOutline />
                </button>
              </li>
              <li>
                <button>
                  <IoPersonOutline />
                </button>
              </li>
              <li>
                <button>
                  <IoBagOutline />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};
