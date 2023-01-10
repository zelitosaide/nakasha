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
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {products.map(function (product) {
              return (
                <li key={product._id}>
                  <div>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <div>
                      <span>{product.name}</span>
                      <span>{product.name}</span>
                      <span>{product.price} MT</span>
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
