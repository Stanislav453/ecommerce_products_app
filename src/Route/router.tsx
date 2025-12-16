import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navigation } from "../components/navigation/Navigation";
import { Shop } from "./pages/Shop";
import { Blog } from "./pages/Blog";
import { ProductDetail } from "./pages/ProductDetail";

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
        path: "/Shop",
        element: <Shop />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/Blog",
        element: <Blog />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/Product-detail",
        element: <ProductDetail />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);
