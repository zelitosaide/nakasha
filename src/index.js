import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./routes/root";
import { Home } from "./routes/home";
import { Boxes } from "./routes/boxes";
import { Recipes } from "./routes/recipes";
import { Help } from "./routes/help";
import { Provider } from "./provider";
import { ProductCategory } from "./routes/product-category";
import { BoxCategory } from "./routes/box-category";
import { loader as singleRanchoLoader, Box } from "./routes/box";
import { loader as swapLoader, Swap } from "./routes/swap";
import { Cart } from "./routes/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Something went wrong!</p>,
    children: [
      {
        path: "home",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ":productCategoryId",
            element: <ProductCategory />,
          },
        ],
      },
      {
        path: "boxes",
        children: [
          {
            index: true,
            element: <Boxes />,
          },
          {
            path: ":boxCategoryId",
            element: <BoxCategory />,
          },
          {
            path: ":boxCategoryId/:boxId",
            loader: singleRanchoLoader,
            element: <Box />,
            children: [
              {
                path: "swap",
                loader: swapLoader,
                element: <Swap />,
              },
            ],
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
);
