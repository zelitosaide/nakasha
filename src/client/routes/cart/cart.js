import { useContext } from "react";

import { CartContext } from "../../../provider";

export function Cart() {
  const {
    cart: { boxes, products, recipes },
    add,
    remove,
  } = useContext(CartContext);

  console.log(boxes, products, recipes);

  return (
    <div>
      <h1
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#444",
          padding: "0 20px",
          margin: 0,
        }}
      >
        Carinho
      </h1>
      {products.length && (
        <div style={{ padding: "0 20px" }}>
          <h2 style={{ fontSize: 12, color: "#444" }}>Productos</h2>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {products.map(function (product) {
              return (
                <li
                  key={product._id}
                  style={{
                    display: "flex",
                    // boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.11)",
                    borderRadius: 15,
                    padding: 16,
                    gap: 10,
                    background: "white",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: 80 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#444",
                          paddingTop: 10,
                        }}
                      >
                        {product.name}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: 8,
                          fontWeight: 400,
                          color: "#777",
                        }}
                      >
                        {product.name}
                      </span>
                      <span
                        style={{
                          color: "#33A02B",
                          display: "block",
                          fontWeight: 900,
                          fontSize: 11,
                          paddingTop: 5,
                        }}
                      >
                        {product.price} MT
                      </span>
                    </div>
                    <div
                      style={{
                        background: "pink",
                        width: 40,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={function () {
                          remove(product, "products");
                        }}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={function () {
                          add(product, "products");
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
