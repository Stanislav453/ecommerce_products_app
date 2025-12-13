import { useContext } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { CartContext } from "../../features/CartProvider";
import { CartItem } from "../../type";

/**
 * ✅ FIXED: Changed from CartContainer to CartContainerProps
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original type name was: type CartContainer
 *
 * PROBLEMS:
 * 1. Naming convention violation: Type names for component props should end with "Props"
 *    - This is a React/TypeScript best practice
 *    - Makes it clear this type is for component props, not a component itself
 * 2. Confusing: CartContainer is also the component name, so having a type with the same
 *    name creates ambiguity
 * 3. Inconsistent: Other prop types in the codebase follow the Props suffix pattern
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Follows React naming convention: ComponentNameProps for prop types
 * - Clear distinction: CartContainer = component, CartContainerProps = prop type
 * - Consistent with React ecosystem standards
 * - Better IDE autocomplete and code navigation
 *
 * LEARN MORE:
 * - React component props: https://react.dev/learn/passing-props-to-a-component
 * - TypeScript naming conventions: https://google.github.io/styleguide/tsguide.html#naming
 * - React TypeScript cheatsheet: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
 */
type CartContainerProps = {
  isCartActive: boolean;
  setIsCartActive: (status: boolean) => void;
};

export const CartContainer = ({
  isCartActive,
  setIsCartActive,
}: CartContainerProps) => {
  const active = isCartActive ? "w-full sm:w-96" : "w-0 overflow-hidden";

  const { cart } = useContext(CartContext);

  return (
    <aside
      className={`fixed top-0 right-0 ${active} z-50 bg-block-color h-full shadow-black shadow-xl transition-all `}
    >
      <div className="flex justify-end">
        <button className="p-2" onClick={() => setIsCartActive(false)}>
          <FaRegTimesCircle className="w-[2.1875rem] h-[2.1875rem] " />
        </button>
      </div>

      {/* ✅ IMPLEMENTED: Empty state for empty cart */}
      {/*
        WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
        The original code had: <ul>{cart.map(...)}</ul>
        When cart was empty, it would show an empty <ul> with no content, which is:
        - Confusing for users (they see nothing, wondering if something is broken)
        - Poor UX (no feedback about the empty state)
        - Unprofessional appearance
        
        WHY THE NEW IMPLEMENTATION WORKS:
        - Shows a clear, friendly message when cart is empty
        - Provides visual feedback that the cart is working correctly
        - Better user experience with helpful messaging
        - Follows UX best practices for empty states
        
        HOW IT WORKS:
        1. Check if cart.length === 0
        2. If empty, show empty state message
        3. If not empty, show cart items as before
        
        LEARN MORE:
        - Empty states in UX: https://www.nngroup.com/articles/empty-state-ux/
        - React conditional rendering: https://react.dev/learn/conditional-rendering
        - User feedback patterns: https://www.interaction-design.org/literature/topics/user-feedback
      */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center">
          <p className="text-lg font-medium text-gray-600 mb-2">
            Your cart is empty
          </p>
          <p className="text-sm text-gray-500">
            Add some products to get started!
          </p>
        </div>
      ) : (
        <ul>
          {cart.map((item: CartItem) => {
            // ✅ FIXED: Changed from key={index} to key={item.id}
            //
            // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
            // The original code used: key={index}
            //
            // PROBLEM: Array indices change when items are added/removed/reordered, but they don't
            // represent the actual identity of the items. Here's what goes wrong:
            //
            // Example scenario:
            // 1. Cart has items: [A(id:1), B(id:2), C(id:3)] with keys [0, 1, 2]
            // 2. User removes item A
            // 3. Cart becomes: [B(id:2), C(id:3)] but keys become [0, 1]
            // 4. React sees: "Item at index 0 changed from A to B, item at index 1 changed from B to C"
            // 5. React re-renders BOTH items even though only A was removed!
            //
            // REAL-WORLD BUGS THIS CAUSES:
            // - Performance: Unnecessary re-renders of unchanged items
            // - State bugs: If items have internal state (like input values), they get mixed up
            // - Animations: CSS transitions break because React thinks items "moved" when they didn't
            // - Focus: Keyboard focus jumps to wrong items after list changes
            //
            // WHY item.id IS CORRECT:
            // - item.id is a stable, unique identifier that doesn't change when list order changes
            // - React can correctly identify: "Item with id=2 is still item B, just moved position"
            // - Only the removed item (id=1) gets unmounted, others stay mounted and just reorder
            // - Better performance: React can reuse DOM nodes and component instances
            //
            // LEARN MORE:
            // - Official React docs: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
            // - Deep dive article: https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318
            // - Video explanation: https://www.youtube.com/watch?v=0la5DBtOVNI
            //
            // BEST PRACTICES:
            // ✅ Use unique IDs from your data (item.id, user.id, etc.) - BEST
            // ✅ Use stable, unique combinations if no ID exists (email + timestamp)
            // ❌ Don't use array index (unless list is static and never reordered)
            // ❌ Don't use Math.random() or Date.now() (creates new key on every render!)
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
      )}
    </aside>
  );
};
