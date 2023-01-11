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
              gap: 12,
            }}
          >
            {products.map(function (product) {
              return (
                <li
                  key={product._id}
                  style={{
                    display: "flex",
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.03)",
                    borderRadius: 20,
                    padding: 14,
                    gap: 10,
                    background: "white",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: 70 }}
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
                          paddingTop: 3,
                        }}
                      >
                        {product.price} MT
                      </span>
                    </div>
                    <div>
                      <button
                        style={{
                          display: "block",
                          width: 24,
                          border: "1px solid #3fc936",
                          background: "white",
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                        }}
                        onClick={function () {
                          add(product, "products");
                        }}
                      >
                        +
                      </button>
                      <span
                        style={{
                          display: "block",
                          textAlign: "center",
                          color: "white",
                          background: "#33A02B",
                          fontSize: 11,
                          padding: "2px 0",
                        }}
                      >
                        {product.quantity}
                      </span>
                      <button
                        style={{
                          display: "block",
                          width: 24,
                          border: "1px solid #3fc936",
                          background: "white",
                          borderBottomLeftRadius: 6,
                          borderBottomRightRadius: 6,
                        }}
                        onClick={function () {
                          remove(product, "products");
                        }}
                      >
                        -
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
