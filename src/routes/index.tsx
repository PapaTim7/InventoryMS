import { createBrowserRouter } from "react-router-dom";
import { checkAuthLoader, checkAppLoader } from "./redirectLoaders";
import { ProductList } from "@/app/product";
import { AuthWrapper, MainWrapper } from "@/wrappers";

export const routes = [
  // AUTH
  {
    path: "/",
    element: <AuthWrapper />,
    loader: checkAuthLoader(),
    children: [
      {
        index: true,
        element: <div>auth</div>,
        // loader: checkAppLoader(),
      },
    ],
  },

  // MAIN
  {
    path: "/",
    element: <MainWrapper />,
    children: [
      {
        path: "products",
        element: <ProductList />,
        // loader: checkAppLoader(),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
