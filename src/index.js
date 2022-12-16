import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./routes/root";
import {
  Products,
  loader as productCategoriesLoader,
} from "./routes/products/products";
import { Boxes } from "./routes/boxes/boxes";
import { Recipes } from "./routes/recipes/recipes";
import { Help } from "./routes/help/help";
import { Provider } from "./provider";
import { ProductCategory } from "./routes/products/product-category";
import { BoxCategory } from "./routes/boxes/box-category";
import { loader as boxLoader, Box } from "./routes/boxes/box";
import { loader as swapLoader, Swap } from "./routes/boxes/swap";
import { Cart } from "./routes/cart/cart";
import { loader as recipeLoader, Recipe } from "./routes/recipes/recipe";
import { RecipeCategory } from "./routes/recipes/recipe-category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Something went wrong!</p>,
    children: [
      {
        path: "products",
        children: [
          {
            index: true,
            loader: productCategoriesLoader,
            element: <Products />,
          },
          {
            path: ":productCategoryId",
            element: <ProductCategory />,
          },
          {
            path: "create",
            element: <h2>Create</h2>,
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
            loader: boxLoader,
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
        children: [
          {
            index: true,
            element: <Recipes />,
          },
          {
            path: ":recipeCategoryId",
            element: <RecipeCategory />,
          },
          {
            path: ":recipeCategoryId/:recipeId",
            loader: recipeLoader,
            element: <Recipe />,
          },
        ],
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
