import { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";

export async function loader({ params }) {
  const productCategory = params.productCategory;
  const response = await fetch(
    baseUrl + "/products?category=" + productCategory + "&limit=100"
  );
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
      <h1
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#444",
        }}
      >
        Escolha um producto para troca
      </h1>
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
