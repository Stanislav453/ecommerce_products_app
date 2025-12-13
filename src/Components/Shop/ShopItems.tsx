import { ProductView } from "../../type";
import { NavLink } from "react-router";
import { RatingContainer } from "./RatingContainer";

interface ShopListProps {
  shopList: ProductView[];
}

export const ShopItems = ({ shopList }: ShopListProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex justify-between px-3">
        <div className="w-full flex">
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shopList.map((product: ProductView) => {
              const { id, title, thumbnail, price, rating } = product;
              return (
                <li
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-500"
                  // ✅ FIXED: Changed from key={index} to key={id}
                  //
                  // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
                  // The original code used: key={index} where index came from map((product, index) => ...)
                  //
                  // PROBLEMS:
                  // - If products are filtered or sorted, indices change but products don't
                  // - React can't track which product is which
                  // - Causes unnecessary re-renders and potential bugs
                  // - See CartContainer.tsx for detailed explanation of index key problems
                  //
                  // WHY THE NEW IMPLEMENTATION WORKS:
                  // - product.id is a unique, stable identifier
                  // - Doesn't change when list is filtered/sorted
                  // - React can properly track each product
                  // - Better performance and correct rendering
                  //
                  // LEARN MORE:
                  // - See detailed comments in CartContainer.tsx for full explanation
                  // - React keys: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
                  key={id}
                >
                  <div className="flex justify-center bg-gradient-to-b from-slate-400 to-gray-400 rounded-3xl">
                    <img width={300} height={300} src={thumbnail} alt={title} />
                  </div>
                  <div className="flex flex-col gap-1 text-center mt-3">
                    <h3 className="text-xl font-medium truncate">{title}</h3>
                    <p className="text-xl font-bold">${price}</p>
                    <RatingContainer
                      rating={rating}
                      className="justify-center"
                    />

                    <NavLink
                      to={`/Product-detail?id=${id}`}
                      className="w-full  py-2 border-[1px] border-black		rounded-full mb-1 mt-3"
                    >
                      Show detail
                    </NavLink>
                    <button className="w-full  py-2 border-[1px] border-black		rounded-full">
                      {/* ✅ FIXED: Changed from "Add to card" to "Add to cart" */}
                      {/* 
                        WHY THE ORIGINAL WAS INCORRECT:
                        - Typo: "card" instead of "cart"
                        - Poor user experience: confusing terminology
                        - Unprofessional appearance
                        
                        WHY THE FIX MATTERS:
                        - Correct terminology improves UX
                        - Professional appearance
                        - Clear communication with users
                        
                        NOTE: This button doesn't actually add to cart yet - see IMPROVEMENTS.md #21
                      */}
                      Add to cart
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
