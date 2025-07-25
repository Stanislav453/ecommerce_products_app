import { useState } from "react";
import type { ProductOrderType, ProductType } from "../../type";
import { NavLink } from "react-router";

interface shopListType {
  shopList: ProductType[];
}

export const ShopItems = ({ shopList }: shopListType) => {
  const [productOrder, setProductOrder] = useState<ProductOrderType[]>([]);

  const createProductOrder = (name: string, price: number, desc: string) => {
    const newProductOrder = {
      name: name,
      price: price,
      desc: desc,
    };

    setProductOrder((prevState) => {
      const uniProduct = prevState.filter(
        (product) => product.name !== newProductOrder.name
      );

      return [...uniProduct, newProductOrder];
    });
  };

  console.log(productOrder);

  return (
    <div className="flex flex-col items-center py-5">
      <div className="w-full max-w-screen-lg flex justify-between px-3">
        <div className="flex">
          <ul className="flex flex-wrap gap-5 justify-between">
            {shopList.map((product: ProductType, index: number) => {
              const { title, thumbnail, price, rating, description } = product;
              return (
                <li
                  className="bg-linear-to-r from-cyan-500 to-blue-500"
                  key={index}
                >
                  <div>
                    <img width={300} height={300} src={thumbnail} alt={title} />
                  </div>
                  <div className="flex flex-col gap-1 text-center">
                    <h3 className="font-semibold text-xl">{title}</h3>
                    <p className="font-semibold text-xl">${price}</p>
                    <p className="font-semibold text-xl"> {rating} </p>
                    <NavLink
                      to={`/Product-detail/${title.replaceAll(" ", "-")}`}
                      state={product}
                      className="w-full  py-2 border-2 border-black		rounded-full"
                    >
                      Show detail
                    </NavLink>
                    <button
                      onClick={() =>
                        createProductOrder(title, price, description)
                      }
                      className="w-full  py-2 border-2 border-black		rounded-full"
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
