/**
 * ✅ IMPLEMENTED: Route constants to replace magic strings
 * 
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code had hardcoded route strings scattered throughout the codebase:
 * - "/Shop" in router.tsx, Navigation.tsx, Header.tsx
 * - "/Blog" in router.tsx, Navigation.tsx
 * - "/Product-detail" in router.tsx, ShopItems.tsx
 * 
 * PROBLEMS:
 * 1. Magic strings: Hard to refactor - if route changes, must update multiple files
 * 2. Typos: Easy to make mistakes (e.g., "/shop" vs "/Shop")
 * 3. Inconsistency: Routes used in different places might get out of sync
 * 4. No type safety: TypeScript can't catch route typos
 * 5. Hard to maintain: Changes require searching entire codebase
 * 
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Single source of truth: All routes defined in one place
 * - Type safety: TypeScript ensures correct route usage
 * - Easy refactoring: Change route in one place, updates everywhere
 * - Consistency: All components use the same route constants
 * - Better IDE support: Autocomplete and go-to-definition work
 * - Follows REST conventions: Lowercase routes (/shop not /Shop)
 * 
 * HOW TO USE:
 * Instead of: <NavLink to="/Shop">Shop</NavLink>
 * Use: <NavLink to={ROUTES.SHOP}>Shop</NavLink>
 * 
 * LEARN MORE:
 * - Constants pattern: https://refactoring.guru/smells/duplicate-code
 * - REST API conventions: https://restfulapi.net/resource-naming/
 * - TypeScript const assertions: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */

/**
 * Application route paths
 * Following REST conventions: lowercase, kebab-case for multi-word routes
 */
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  BLOG: '/blog',
  PRODUCT_DETAIL: '/product-detail',
} as const;

