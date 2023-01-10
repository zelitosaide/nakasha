import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";
import { CartContext } from "../../../provider";

export async function loader({ params }) {
  const productId = params.productId;
  const response = await fetch(baseUrl + "/products/" + productId);
  return await response.json();
}

export function Product() {
  const product = useLoaderData();
  const { cart, add, remove } = useContext(CartContext);

  const productFoundInCart = cart.products.find(function (item) {
    return item._id === product._id;
  });

  return (
    <div>
      <p>
        <strong>Nome do Produto:</strong> {product.name}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Image:</strong>{" "}
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "200px" }}
        />
      </p>
      <p>
        <strong>Price:</strong> {product.price}
      </p>

      <p>
        <b>Adicionar ao carinho</b>
      </p>
      {productFoundInCart && (
        <>
          <button
            onClick={function () {
              remove(product, "products");
            }}
          >
            -
          </button>
          <span>{productFoundInCart.quantity}</span>
        </>
      )}
      <button
        onClick={function () {
          add(product, "products");
        }}
      >
        +
      </button>
    </div>
  );
}
