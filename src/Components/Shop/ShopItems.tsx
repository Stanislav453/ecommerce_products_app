import { useContext } from "react";
import { ProductView, CartItem, CartAction } from "../../type";
import { NavLink } from "react-router";
import { RatingContainer } from "./RatingContainer";
import { CartContext } from "../../features/CartProvider";
// ✅ FIXED: Import route constants and helper function
import { ROUTES, getProductDetailUrl } from "../../constants/routes";

interface ShopListProps {
  shopList: ProductView[];
}

export const ShopItems = ({ shopList }: ShopListProps) => {
  // ✅ IMPLEMENTED: Add to cart functionality
  //
  // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
  // The original button had no onClick handler - it was just a placeholder:
  //   <button>Add to cart</button>  // ❌ No functionality
  //
  // PROBLEMS:
  // 1. Non-functional: Button did nothing when clicked
  // 2. Poor UX: Users expect the button to work
  // 3. Incomplete feature: Core e-commerce functionality missing
  //
  // WHY THE NEW IMPLEMENTATION WORKS:
  // - Uses React Context to access cart state and dispatch function
  // - Converts ProductView to CartItem format (adds quantity: 1)
  // - Dispatches "Add" action to add item to cart
  // - Provides user feedback (could add toast notification later)
  //
  // HOW IT WORKS:
  // 1. useContext(CartContext) gives us access to cart state and dispatch
  // 2. handleAddToCart converts ProductView → CartItem (adds quantity: 1)
  // 3. Dispatches { type: "Add", product: cartItem } action
  // 4. CartReducer handles the action and updates cart state
  // 5. All components using CartContext automatically re-render with new cart
  //
  // LEARN MORE:
  // - React Context: https://react.dev/learn/passing-data-deeply-with-context
  // - useReducer: https://react.dev/reference/react/useReducer
  // - Type conversion: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
  const { dispatch } = useContext(CartContext);

  /**
   * Handles adding a product to the cart
   *
   * WHY WE NEED THIS FUNCTION:
   * - ProductView and CartItem have different shapes
   * - ProductView: { id, title, thumbnail, price, rating }
   * - CartItem: { id, title, thumbnail, price, quantity }
   * - We need to add quantity: 1 when converting
   *
   * HOW IT WORKS:
   * 1. Takes a ProductView (from shop list)
   * 2. Creates a CartItem with quantity: 1
   * 3. Dispatches "Add" action to CartReducer
   * 4. CartReducer adds item to cart state
   *
   * LEARN MORE:
   * - Object spread: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
   * - Type narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
   */
  const handleAddToCart = (product: ProductView) => {
    // Convert ProductView to CartItem format
    // We add quantity: 1 because this is a new item being added
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1, // New items start with quantity 1
    };

    // Dispatch the "Add" action to the cart reducer
    // This will trigger CartReducer to add the item to the cart
    const action: CartAction = {
      type: "Add",
      product: cartItem,
    };

    dispatch(action);
    // TODO: Consider adding user feedback (toast notification, animation, etc.)
  };

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
                      to={getProductDetailUrl(id)}
                      className="w-full  py-2 border-[1px] border-black		rounded-full mb-1 mt-3"
                    >
                      Show detail
                    </NavLink>
                    {/* ✅ FIXED: Changed from search param to path param
                      Original: to={`${ROUTES.PRODUCT_DETAIL}?id=${id}`}  // ❌ /product-detail?id=123
                      Fixed: to={getProductDetailUrl(id)}  // ✅ /product-detail/123 (RESTful)
                      
                      WHY THIS IS BETTER:
                      - RESTful URL structure (follows industry standards)
                      - Better SEO (search engines prefer path parameters)
                      - More intuitive URLs (easier to read and understand)
                      - Easier to bookmark/share (cleaner URLs)
                      - Uses helper function for consistency and maintainability
                      
                      LEARN MORE:
                      - REST API conventions: https://restfulapi.net/resource-naming/
                      - React Router params: https://reactrouter.com/en/main/route/route#dynamic-segments
                    */}
                    {/* ✅ IMPLEMENTED: Add to cart button with functionality */}
                    {/*
                      WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
                      The original button had no onClick handler:
                        <button>Add to cart</button>  // ❌ No functionality
                      
                      PROBLEMS:
                      1. Non-functional: Button did nothing when clicked
                      2. Poor UX: Users expect buttons to work
                      3. Incomplete feature: Core e-commerce functionality missing
                      
                      WHY THE NEW IMPLEMENTATION WORKS:
                      - onClick handler calls handleAddToCart function
                      - Function converts ProductView to CartItem and dispatches action
                      - Cart state updates automatically via Context
                      - Button is now fully functional
                      
                      LEARN MORE:
                      - Event handlers: https://react.dev/learn/responding-to-events
                      - Context API: https://react.dev/learn/passing-data-deeply-with-context
                    */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full  py-2 border-[1px] border-black		rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`Add ${title} to cart`}
                    >
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
