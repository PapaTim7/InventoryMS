import { createBrowserRouter } from "react-router-dom";
import { checkAuthLoader, checkAppLoader } from "./redirectLoaders";
import { ProductList, ProductForm } from "@/app/product";
import { AuthWrapper, MainWrapper } from "@/wrappers";
import { Login } from "@/app/auth";

export const routes = [
  // MAIN
  {
    errorElement: <>404 Not Found</>,
    path: "/",
    element: <MainWrapper />,
    loader: checkAppLoader(),
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      { path: "products/new", element: <ProductForm /> },
      { path: "products/:id", element: <ProductForm /> },
    ],
  },
  // AUTH
  {
    errorElement: <>404 Not Found</>,
    path: "/",
    element: <AuthWrapper />,
    loader: checkAuthLoader(),
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
