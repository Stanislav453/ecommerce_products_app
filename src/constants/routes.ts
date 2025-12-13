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
 * ✅ FIXED: Product detail now uses path parameter instead of search param
 */
export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  BLOG: "/blog",
  PRODUCT_DETAIL: "/product-detail/:id",
} as const;

/**
 * Helper function to generate product detail URL with ID
 * ✅ FIXED: Changed from search param (?id=123) to path param (/product-detail/123)
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code used: `${ROUTES.PRODUCT_DETAIL}?id=${id}`
 * This created URLs like: /product-detail?id=123
 *
 * PROBLEMS:
 * 1. Not RESTful: Resource IDs should be in the path, not query params
 * 2. Poor SEO: Search engines prefer clean URLs with path parameters
 * 3. Less semantic: Path parameters are more intuitive and readable
 * 4. Harder to bookmark/share: Path params are more user-friendly
 * 5. Inconsistent with REST conventions: Industry standard is path params for resources
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Uses path parameter: /product-detail/:id
 * - Creates clean URLs: /product-detail/123
 * - RESTful: Follows industry standards
 * - Better SEO: Search engines prefer path parameters
 * - More intuitive: Easier to read and understand
 *
 * LEARN MORE:
 * - REST API conventions: https://restfulapi.net/resource-naming/
 * - React Router params: https://reactrouter.com/en/main/route/route#dynamic-segments
 * - URL design: https://www.w3.org/Provider/Style/URI
 */
export const getProductDetailUrl = (id: string): string => {
  return `/product-detail/${id}`;
};
