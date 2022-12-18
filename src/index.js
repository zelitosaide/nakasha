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
import {
  action as createProductAction,
  CreateProduct,
} from "./routes/products/create";
import { Product, loader as productLoader } from "./routes/products/product";
import {
  ProductList,
  loader as productListLoader,
} from "./routes/products/product-list";
import {
  UpdateProduct,
  action as updateProductAction,
  loader as updateProductLoader,
} from "./routes/products/update";
import { action as deleteProductAction } from "./routes/products/delete";
import {
  CategoryList,
  loader as categoryListLoader,
} from "./routes/products/categories/category-list";
import {
  UpdateProductCategory,
  loader as updateProductCategoryLoader,
} from "./routes/products/categories/update";

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
            path: ":productCategoryId/:productId",
            loader: productLoader,
            element: <Product />,
          },
          {
            path: ":productCategoryId/:productId/edit",
            action: updateProductAction,
            loader: updateProductLoader,
            element: <UpdateProduct />,
          },
          {
            path: "create",
            action: createProductAction,
            loader: productCategoriesLoader,
            element: <CreateProduct />,
          },
          {
            path: "list",
            loader: productListLoader,
            element: <ProductList />,
          },
          {
            path: "list/:productId/delete",
            action: deleteProductAction,
          },
          {
            path: "categories",
            loader: categoryListLoader,
            element: <CategoryList />,
          },
          {
            path: "categories/:categoryId/edit",
            loader: updateProductCategoryLoader,
            element: <UpdateProductCategory />,
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
