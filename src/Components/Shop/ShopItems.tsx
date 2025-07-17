import React from "react";
import type { ProductType } from "../../type";

interface shopListType {
  shopList: ProductType[];
}

export const ShopItems = ({ shopList }: shopListType) => {
  return (
    <ul className="flex flex-wrap gap-5 justify-center">
      {shopList.map((product: ProductType, index: number) => {
        const { title, thumbnail, price, rating } = product;
        return (
          <li className="bg-linear-to-r from-cyan-500 to-blue-500" key={index}>
            <div>
              <img width={300} height={300} src={thumbnail} alt={title} />
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
  );
};
