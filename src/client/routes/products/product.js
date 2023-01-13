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
      <h1
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#444",
          padding: "0 20px",
          margin: 0,
          paddingBottom: 10,
        }}
      >
        {product.name}
      </h1>
      <div
        style={{
          padding: "20px 0",
          background: "white",
          borderRadius: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            // background: "pink",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "200px" }}
          />
        </div>
        <div>
          <h1
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#444",
              margin: 0,
            }}
          >
            Descricao do Produto
          </h1>
          <p style={{ fontSize: 12, fontWeight: 400, color: "#444" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>

      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Image:</strong>{" "}
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
