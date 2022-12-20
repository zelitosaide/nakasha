import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Client
import { Root } from "./client/root";
import {
  Products,
  loader as productCategoriesLoader,
} from "./client/routes/products/products";
import { Boxes } from "./client/routes/boxes/boxes";
import { Recipes } from "./client/routes/recipes/recipes";
import { Help } from "./client/routes/help/help";
import { Provider } from "./provider";
import {
  ProductCategory,
  loader as productCategoryLoader,
} from "./client/routes/products/product-category";
import { BoxCategory } from "./client/routes/boxes/box-category";
import { loader as boxLoader, Box } from "./client/routes/boxes/box";
import { loader as swapLoader, Swap } from "./client/routes/boxes/swap";
import { Cart } from "./client/routes/cart/cart";
import { loader as recipeLoader, Recipe } from "./client/routes/recipes/recipe";
import { RecipeCategory } from "./client/routes/recipes/recipe-category";
import {
  Product,
  loader as productLoader,
} from "./client/routes/products/product";

// Admin
import { Root as RootAdmin } from "./admin/root";
import {
  action as createProductAction,
  CreateProduct,
} from "./admin/routes/products/create";
import {
  ProductList,
  loader as productListLoader,
} from "./admin/routes/products/list";
import {
  UpdateProduct,
  action as updateProductAction,
  loader as updateProductLoader,
} from "./admin/routes/products/update";
import { action as deleteProductAction } from "./admin/routes/products/delete";
import {
  CategoryList,
  loader as categoryListLoader,
} from "./admin/routes/products/categories/list";
import {
  UpdateProductCategory,
  action as updateProductCategoryAction,
  loader as updateProductCategoryLoader,
} from "./admin/routes/products/categories/update";
import {
  action as createProductCategoryAction,
  CreateProductCategory,
} from "./admin/routes/products/categories/create";
import { action as deleteProductCategoryAction } from "./admin/routes/products/categories/delete";
import { BoxList, loader as boxListLoader } from "./admin/routes/boxes/list";

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
            loader: productCategoryLoader,
            element: <ProductCategory />,
          },
          {
            path: ":productCategoryId/:productId",
            loader: productLoader,
            element: <Product />,
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
  {
    path: "dashboard",
    element: <RootAdmin />,
    errorElement: <p>Something went wrong with dashboard</p>,
    children: [
      {
        path: "products",
        children: [
          {
            index: true,
            loader: productListLoader,
            element: <ProductList />,
          },
          {
            path: "create",
            action: createProductAction,
            loader: productCategoriesLoader,
            element: <CreateProduct />,
          },
          {
            path: ":productId/delete",
            action: deleteProductAction,
          },
          {
            path: ":productId/edit",
            action: updateProductAction,
            loader: updateProductLoader,
            element: <UpdateProduct />,
          },
          {
            path: "categories",
            loader: categoryListLoader,
            element: <CategoryList />,
          },
          {
            path: "categories/create",
            action: createProductCategoryAction,
            element: <CreateProductCategory />,
          },
          {
            path: "categories/:categoryId/edit",
            action: updateProductCategoryAction,
            loader: updateProductCategoryLoader,
            element: <UpdateProductCategory />,
          },
          {
            path: "categories/:categoryId/delete",
            action: deleteProductCategoryAction,
          },
        ],
      },
      {
        path: "boxes",
        children: [
          {
            index: true,
            loader: boxListLoader,
            element: <BoxList />,
          },
          {
            path: "create",
            action: createProductAction,
            loader: productCategoriesLoader,
            element: <CreateProduct />,
          },
          {
            path: ":productId/delete",
            action: deleteProductAction,
          },
          {
            path: ":productId/edit",
            action: updateProductAction,
            loader: updateProductLoader,
            element: <UpdateProduct />,
          },
          {
            path: "categories",
            loader: categoryListLoader,
            element: <CategoryList />,
          },
          {
            path: "categories/create",
            action: createProductCategoryAction,
            element: <CreateProductCategory />,
          },
          {
            path: "categories/:categoryId/edit",
            action: updateProductCategoryAction,
            loader: updateProductCategoryLoader,
            element: <UpdateProductCategory />,
          },
          {
            path: "categories/:categoryId/delete",
            action: deleteProductCategoryAction,
          },
        ],
      },
      {
        path: "cart",
      },
      {
        path: "recipes",
      },
      {
        path: "help",
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
