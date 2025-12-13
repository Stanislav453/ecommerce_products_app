import { useState, useContext } from "react";
import { ProductSummary, CartItem, CartAction } from "../../type";
import { RatingContainer } from "../shop/RatingContainer";
import { CartContext } from "../../features/CartProvider";

interface ProductDetailViewsProps {
  data: ProductSummary | null;
}

export const ProdDetailViews = ({ data }: ProductDetailViewsProps) => {
  // ✅ CRITICAL: Hooks MUST be called at the top level, before any early returns
  //
  // WHY THIS IS IMPORTANT:
  // React Hooks must be called in the exact same order on every render.
  // If we call hooks after an early return (like `if (data === null) return null;`),
  // then when data is null, the hooks won't be called, breaking the Rules of Hooks.
  //
  // THE PROBLEM:
  // - Original code had: if (data === null) return null; BEFORE hooks
  // - This means hooks were called conditionally (only when data is not null)
  // - React requires hooks to be called unconditionally at the top level
  //
  // THE FIX:
  // - Move all hooks to the top, before any conditional returns
  // - This ensures hooks are always called in the same order
  //
  // LEARN MORE:
  // - Rules of Hooks: https://react.dev/reference/rules/rules-of-hooks
  // - useState: https://react.dev/reference/react/useState
  // - useContext: https://react.dev/reference/react/useContext
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useContext(CartContext);

  // Early return AFTER hooks (this is safe)
  if (data === null) return null;

  const {
    title,
    images,
    price,
    rating,
    description,
    category,
    tags,
    id,
    thumbnail,
  } = data;

  /**
   * Handles adding product to cart with selected quantity
   *
   * WHY WE NEED THIS FUNCTION:
   * - ProductSummary and CartItem have different shapes
   * - ProductSummary: { id, title, price, thumbnail, ... } (no quantity)
   * - CartItem: { id, title, price, thumbnail, quantity }
   * - We need to add the selected quantity when converting
   *
   * HOW IT WORKS:
   * 1. Takes current quantity from state
   * 2. Creates CartItem with selected quantity
   * 3. Dispatches "Add" action to CartReducer
   * 4. CartReducer adds item(s) to cart
   *
   * NOTE: If item already exists in cart, CartReducer will add it again
   * (This creates duplicate entries - could be improved to check for existing items)
   *
   * LEARN MORE:
   * - Type conversion: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
   * - Reducer patterns: https://react.dev/reference/react/useReducer
   */
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: id,
      title: title,
      price: price,
      thumbnail: thumbnail,
      quantity: quantity, // Use selected quantity
    };

    const action: CartAction = {
      type: "Add",
      product: cartItem,
    };

    dispatch(action);
    // TODO: Add user feedback (toast, success message, etc.)
    // TODO: Consider resetting quantity to 1 after adding
  };

  return (
    <div className=" w-full max-w-screen-xl flex justify-between items-center py-5 px-3">
      <article className="flex flex-col md:flex-row gap-12">
        <div className="basis-full md:basis-[550px] shrink-0 flex justify-center bg-slate-500 rounded-3xl ">
          <img
            className=" md:h-[550px] object-contain"
            src={images[0]}
            alt={title}
          />
        </div>
        <div>
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="font-bold text-xl my-4">${price}</p>
          <div>
            <RatingContainer rating={rating} />
          </div>
          <p className="my-2 text-theme-gray-font ">{description}</p>

          {/* ✅ IMPLEMENTED: Quantity manager and Add to cart functionality */}
          {/*
            WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
            The original code had: <div>PLACE FOR COUNT MANAGER</div>
            
            PROBLEMS:
            1. Placeholder text in production - unprofessional
            2. No functionality - users couldn't select quantity
            3. No way to add product to cart from detail page
            4. Incomplete user experience
            
            WHY THE NEW IMPLEMENTATION WORKS:
            - Quantity input allows users to select 1-10 items
            - Input is controlled by React state (quantity)
            - onChange handler updates state when user changes quantity
            - Add to cart button dispatches action with selected quantity
            - Proper UX with visual feedback
            
            HOW IT WORKS:
            1. User selects quantity using number input (1-10)
            2. setQuantity updates state on change
            3. User clicks "Add to cart"
            4. handleAddToCart creates CartItem with selected quantity
            5. Dispatches action to add item(s) to cart
            
            LEARN MORE:
            - Controlled components: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
            - Number inputs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
            - Form handling: https://react.dev/learn/responding-to-events#event-handlers
          */}
          <div className="mb-2 flex items-center gap-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => {
                // ✅ Convert string to number and update state
                // WHY: Input values are always strings, but we need a number
                // parseInt converts "5" → 5, or we could use Number() or +e.target.value
                const newQuantity = parseInt(e.target.value, 10) || 1;
                // Clamp value between 1 and 10
                const clampedQuantity = Math.max(1, Math.min(10, newQuantity));
                setQuantity(clampedQuantity);
              }}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
              aria-label="Select quantity"
            />
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
              aria-label={`Add ${quantity} ${title} to cart`}
            >
              Add to cart ({quantity})
            </button>
          </div>

          <div className="border-t border-theme-gray-border"></div>
          <div className="flex mt-2">
            <p>
              {" "}
              <span className="font-medium">CATEGORY: </span>
              <span className="text-theme-gray-font">{category}</span>
            </p>
            <p className="pl-2">
              <span className="font-medium">TAGS: </span>{" "}
              <span className="text-theme-gray-font">
                {tags.map((tag: string) => tag + " ")}
              </span>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
