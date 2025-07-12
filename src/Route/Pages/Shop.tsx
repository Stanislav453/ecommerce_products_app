// import { UseFetchData } from "../../api/ApiActions/FetchProducts";

import { useProducts } from "../../Store/useProducts";
import loadingSpinner from "/public/loadingSpinner.svg";
import type { ProductType } from "../../type";
import { useError } from "../../Store/useError";
import { NavLink } from "react-router-dom";
import { PageSection } from "../../Components/PageSection";

export const Shop = () => {
  const products = useProducts((state: any) => state.products);
  const apiError = useError((state) => state.apiError);

  if (apiError !== "")
    return (
      <div className="flex flex-col w-full items-center mt-28">
        <p>{apiError}</p>
        <p className="text-red-600">Something is wrong.</p>
        <p>
          Please go to{" "}
          <NavLink to="/" className="font-bold underline	">
            Home
          </NavLink>{" "}
          and try it later.
        </p>
      </div>
    );

  if (products.length == 0)
    return (
      <div className="flex w-full justify-center mt-28">
        <img className="w-12" src={loadingSpinner} alt="loading" />
      </div>
    );

  return (
    <section>
      <PageSection>Shop</PageSection>
      <ul className="flex flex-wrap gap-5 justify-center">
        {products.map((product: ProductType, index: number) => {
          const { title, thumbnail, price, rating } = product;
          return (
            <li
              className="bg-linear-to-r from-cyan-500 to-blue-500"
              key={index}
            >
              <div>
                <img src={thumbnail} alt={title} />
              </div>
              <div className="flex flex-col gap-1 text-center">
                <h3 className="font-semibold text-xl">{title}</h3>
                <p className="font-semibold text-xl">${price}</p>
                <p className="font-semibold text-xl"> {rating} </p>
                <button className="w-full  py-2 border-2 border-black		rounded-full">
                  Add to card
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
