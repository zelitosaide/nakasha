import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";
import { Cart } from "../../../assets/icons/cart";
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
              marginBottom: 0,
            }}
          >
            Descrição do Produto
          </h1>
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#444",
              marginBottom: 6,
              marginTop: 6,
              lineHeight: 1.4,
            }}
          >
            Inclui: Tomate(1Kg), Alface(1Kg), Cebola(5kg), Alho(10Kg),
            Pimenta(2Kg), Brócolis(1Kg), repolho(1Kg), alface(1Kg), Couve(1kg),
            cebola(1Kg)
          </p>
          <p
            style={{
              color: "#33A02B",
              fontWeight: 900,
              fontSize: 18,
              margin: 0,
            }}
          >
            {product.price} MT
          </p>
          <button
            onClick={function () {
              add(product, "products");
            }}
            style={{
              display: "flex",
              width: "100%",
              marginTop: 10,
              border: "none",
              outline: "none",
              borderRadius: 22,
              background: "#EF7200",
              color: "white",
              height: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Cart style={{ width: 26, color: "white" }} />
            <span style={{ marginLeft: 10 }}>Adicionar ao carinho</span>
          </button>
        </div>
      </div>

      {/* {productFoundInCart && (
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
      </button> */}
    </div>
  );
}
