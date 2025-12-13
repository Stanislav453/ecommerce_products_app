import { CartAction, CartItem } from "../type";

/**
 * Cart Reducer - Manages cart state using immutable updates
 * 
 * ✅ FIXED: This reducer now uses immutable patterns instead of direct state mutation
 * 
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code directly mutated state objects:
 *   state[IndexI].quantity += 1;  // ❌ Direct mutation
 *   return [...state];
 * 
 * PROBLEMS WITH DIRECT MUTATION:
 * 1. React's change detection relies on reference equality - if you mutate an object,
 *    the reference stays the same, so React might not detect the change
 * 2. Breaks React DevTools time-travel debugging (past states get mutated)
 * 3. Can cause components to not re-render when they should
 * 4. Makes state unpredictable - old references to state get mutated too
 * 5. Violates Redux/React best practices for reducers
 * 
 * Example of the bug:
 *   const oldCart = cart;  // Save reference
 *   dispatch({ type: "Increase", id: "1" });
 *   // oldCart[0].quantity is ALSO changed! (same object reference)
 *   // This breaks expectations and causes bugs
 * 
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Uses map() to create a NEW array with NEW objects
 * - Spread operator ({ ...item }) creates a shallow copy of the item
 * - Only the changed item gets a new object, others stay the same
 * - React can properly detect changes via reference comparison
 * - Old references remain unchanged (predictable behavior)
 * 
 * LEARN MORE:
 * - React immutability: https://react.dev/learn/updating-objects-in-state
 * - Reducer patterns: https://react.dev/reference/react/useReducer
 * - Why immutability matters: https://daveceddia.com/react-redux-immutability-guide/
 * - Deep dive: https://www.joshwcomeau.com/react/why-react-re-renders/
 */
export const CartReducer = (
  state: CartItem[],
  action: CartAction
): CartItem[] => {
  switch (action.type) {
    case "Add":
      // ✅ Immutable: Creates new array with new item appended
      return [...state, action.product];

    case "Remove":
      // ✅ Immutable: filter() creates a new array
      return state.filter((item) => item.id !== action.id);

    case "Increase":
      // ✅ FIXED: Immutable update using map()
      // Original (WRONG): state[IndexI].quantity += 1; return [...state];
      // 
      // Why this works:
      // - map() creates a NEW array
      // - Spread operator creates a NEW object for the updated item
      // - Other items stay as-is (same references, but that's OK since they didn't change)
      // - React sees: "Array changed, item at position X is a new object" → re-renders correctly
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }  // New object with updated quantity
          : item  // Same reference (unchanged)
      );

    case "Decrease":
      // ✅ FIXED: Immutable update with auto-removal when quantity reaches 0
      // Original (WRONG): state[IndexD].quantity -= 1; return [...state];
      //
      // Why this works:
      // - Creates new array with map()
      // - Returns null for items that should be removed (quantity <= 0)
      // - filter() removes nulls and TypeScript type guard ensures type safety
      // - Better UX: automatically removes items when quantity hits 0
      return state.map((item) => {
        if (item.id !== action.id) return item;
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          // Remove item if quantity reaches 0
          return null;
        }
        return { ...item, quantity: newQuantity };  // New object with updated quantity
      }).filter((item): item is CartItem => item !== null);

    default:
      return state;
  }
};
