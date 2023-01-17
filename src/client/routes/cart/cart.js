import { useContext } from "react";

import { CartContext } from "../../../provider";

export function Cart() {
  const {
    cart: { boxes, products, recipes },
    add,
    remove,
  } = useContext(CartContext);

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
        Carinho
      </h1>
      <div
        style={{
          padding: "10px 20px 20px 20px",
          background: "white",
          borderRadius: 20,
        }}
      >
        {products.length ? (
          <div>
            <h2
              style={{
                fontSize: 12,
                color: "#33A02B",
                paddingBottom: 10,
                margin: 0,
              }}
            >
              Productos do carinho
            </h2>
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
                      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.11)",
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
                            fontWeight: 700,
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
                            fontWeight: 700,
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
        ) : null}

        {boxes.length ? (
          <div style={{ marginTop: 20 }}>
            <h2
              style={{
                fontSize: 12,
                color: "#33A02B",
                paddingBottom: 10,
                margin: 0,
              }}
            >
              Caixas do carinho
            </h2>
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
              {boxes.map(function (box) {
                return (
                  <li
                    key={box._id}
                    style={{
                      display: "flex",
                      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.11)",
                      borderRadius: 20,
                      padding: 14,
                      gap: 10,
                      background: "white",
                    }}
                  >
                    <img
                      src={box.imageUrl}
                      alt={box.name}
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
                          {box.name}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: 8,
                            fontWeight: 400,
                            color: "#777",
                          }}
                        >
                          {box.name}
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
                          {box.price} MT
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
                            fontWeight: 700,
                          }}
                          onClick={function () {
                            add(box, "boxes");
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
                          {box.quantity}
                        </span>
                        <button
                          style={{
                            display: "block",
                            width: 24,
                            border: "1px solid #3fc936",
                            background: "white",
                            borderBottomLeftRadius: 6,
                            borderBottomRightRadius: 6,
                            fontWeight: 700,
                          }}
                          onClick={function () {
                            remove(box, "boxes");
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
        ) : null}
      </div>
    </div>
  );
}
