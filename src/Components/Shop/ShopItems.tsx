import { ProductSummary } from "../../type";
import { NavLink } from "react-router";
import { RatingContainer } from "./RatingContainer";

interface ShopListProps {
  shopList: ProductSummary[];
}

export const ShopItems = ({ shopList }: ShopListProps) => {
  const createProductOrder = (name: string, price: number, desc: string) => {
    const newProductOrder = {
      name: name,
      price: price,
      desc: desc,
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex justify-between px-3">
        <div className="w-full flex">
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shopList?.map((product: ProductSummary, index: number) => {
              const { id, title, thumbnail, price, rating, description } =
                product;
              return (
                <li
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-500"
                  key={index}
                >
                  <div className="flex justify-center bg-gradient-to-b from-slate-400 to-gray-400 rounded-3xl">
                    <img width={300} height={300} src={thumbnail} alt={title} />
                  </div>
                  <div className="flex flex-col gap-1 text-center mt-3">
                    <h3 className="text-xl font-medium truncate">{title}</h3>
                    <p className="text-xl font-bold">${price}</p>
                    <RatingContainer rating={rating} />

                    <NavLink
                      to={`/Product-detail?id=${id}`}
                      className="w-full  py-2 border-[1px] border-black		rounded-full mb-1 mt-3"
                    >
                      Show detail
                    </NavLink>
                    <button
                      onClick={() =>
                        createProductOrder(title, price, description)
                      }
                      className="w-full  py-2 border-[1px] border-black		rounded-full"
                    >
                      Add to card
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
