import { useContext } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { CartContext } from "../../features/CartProvider";
import { CartItem } from "../../type";

type CartContainer = {
  isCartActive: boolean;
  setIsCartActive: (status: boolean) => void;
};

export const CartContainer = ({
  isCartActive,
  setIsCartActive,
}: CartContainer) => {
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
    </aside>
  );
};
