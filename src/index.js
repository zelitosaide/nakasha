import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./routes/root";
import { Category } from "./routes/category";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    errorElement: <p>Something went wrong!</p>,
    children: [
      {
        path: "home",
        element: <Root />,
      },
      {
        path: "rancho",
        element: <h3 style={{ padding: 10 }}>rancho</h3>,
      },
      {
        path: "carinho",
        element: <h3 style={{ padding: 10 }}>carinho</h3>,
      },
      {
        path: "receitas",
        element: <h3 style={{ padding: 10 }}>receitas</h3>,
      },
      {
        path: "ajuda",
        element: <h3 style={{ padding: 10 }}>ajuda</h3>,
      },
      // categorias
      {
        path: "frutasepoca",
        element: <Category name="Frutas da epoca" />,
      },
      {
        path: "saborosasepicas",
        element: <Category name="Saborosas e epicas" />,
      },
      {
        path: "frescossaudaveis",
        element: <Category name="Frescos e saudaveis" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
