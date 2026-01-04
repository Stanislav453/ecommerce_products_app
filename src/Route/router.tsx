import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navigation } from "../components/navigation/Navigation";
import { ProductDetail } from "./pages/ProductDetail";
import { Shop } from "./pages/Shop";

export const router = createBrowserRouter([
  {
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/shop",
        element: <Shop />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/product-detail",
        element: <ProductDetail />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/shop/category/:category",
        element: <Shop />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);
