import { useContext } from "react";

import { CartContext } from "../../../provider";

export function Cart() {
  const {
    cart: { boxes, products, recipes },
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
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.11)",
                    borderRadius: 10,
                    padding: 16,
                    gap: 10,
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
                      background: "green",
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
                        }}
                      >
                        {product.name}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: 8,
                          fontWeight: 400,
                          color: "#444",
                        }}
                      >
                        {product.name}
                      </span>
                      <span>{product.price} MT</span>
                    </div>
                    <div style={{ background: "pink", width: 40 }}>
                      <button>-</button>
                      <span>{product.quantity}</span>
                      <button>+</button>
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
