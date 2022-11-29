import { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import { CartContext } from "../provider";

const baseURL = "http://localhost:5000/";

export async function loader({ params }) {
  const boxCategoryId = params.boxCategoryId;
  const response = await fetch(baseURL + "products?category=" + boxCategoryId);
  const products = await response.json();
  return products;
}

export function Swap() {
  const { items: products } = useLoaderData();
  const navigate = useNavigate();
  const { swap } = useContext(CartContext);
  const location = useLocation();
  const boxId = location.state?.boxId;
  const productId = location.state?.productId;

  return (
    <>
      <p>
        <b>Escolha um producto para troca</b>
      </p>
      {!!products.length && (
        <div>
          {products.map(function (product) {
            return (
              <button
                key={product._id}
                style={{ marginRight: 5, marginBottom: 5 }}
                onClick={function () {
                  swap({ boxId, productId, product });
                  navigate(-1);
                }}
              >
                {product.name}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
