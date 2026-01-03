import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navigation } from "../components/navigation/Navigation";
import { Blog } from "./pages/Blog";
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
        path: "/blog",
        element: <Blog />,
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
