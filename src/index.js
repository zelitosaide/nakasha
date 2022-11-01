import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Something went wrong!</p>,
    children: [
      {
        path: "rancho"
      },
      {
        path: "carinho"
      },
      {
        path: "receitas"
      },
      {
        path: "ajuda"
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RouterProvider router={router} />
);