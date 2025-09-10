import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { Navigation } from "../Components/Navigation/Navigation";
import { Shop } from "./Pages/Shop";
import { Blog } from "./Pages/Blog";
import { ProductDetail } from "./Pages/ProductDetail";

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
      {
        path: "/Category`",
        element: <ProductDetail />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);
