import { createBrowserRouter } from "react-router-dom";
import { checkAuthLoader, checkAppLoader } from "./redirectLoaders";
import { ProductList, ProductForm } from "@/app/product";
import { AuthWrapper, MainWrapper } from "@/wrappers";

export const routes = [
  // AUTH
  {
    errorElement: <>404 Not Found</>,
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
    errorElement: <>404 Not Found</>,
    path: "/",
    element: <MainWrapper />,
    children: [
      {
        path: "products",
        element: <ProductList />,
      },
      { path: "products/new", element: <ProductForm /> },
      { path: "products/:id", element: <ProductForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
