import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navigation } from "../components/navigation/Navigation";
import { Shop } from "./pages/Shop";
import { Blog } from "./pages/Blog";
import { ProductDetail } from "./pages/ProductDetail";
// ✅ FIXED: Import route constants instead of using magic strings
// This ensures consistency and makes refactoring easier
import { ROUTES } from "../constants/routes";

/**
 * ✅ FIXED: Route configuration using constants and REST conventions
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code had:
 * - path: "/Shop" (capitalized, not RESTful)
 * - path: "/Blog" (capitalized, not RESTful)
 * - path: "/Product-detail" (inconsistent casing)
 * - Hardcoded strings scattered throughout
 *
 * PROBLEMS:
 * 1. Not RESTful: Routes should be lowercase (REST API convention)
 * 2. Inconsistent: Mix of capitalized and lowercase routes
 * 3. Magic strings: Hard to refactor and maintain
 * 4. Typos: Easy to make mistakes
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Uses ROUTES constants: Single source of truth
 * - RESTful conventions: All routes lowercase (/shop, /blog)
 * - Type safety: TypeScript ensures correct route usage
 * - Easy refactoring: Change route in one place
 * - Consistent: All routes follow same pattern
 *
 * LEARN MORE:
 * - REST API conventions: https://restfulapi.net/resource-naming/
 * - React Router: https://reactrouter.com/en/main/start/overview
 * - Constants pattern: https://refactoring.guru/smells/duplicate-code
 */
export const router = createBrowserRouter([
  {
    element: <Navigation />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: ROUTES.SHOP,
        element: <Shop />,
        errorElement: <NotFoundPage />,
      },
      {
        path: ROUTES.BLOG,
        element: <Blog />,
        errorElement: <NotFoundPage />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetail />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);
