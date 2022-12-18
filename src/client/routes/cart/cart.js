import { useContext } from "react";

import { CartContext } from "../../../provider";

export function Cart() {
  const {
    cart: { items },
  } = useContext(CartContext);

  return (
    <div
      style={{
        marginTop: 70,
        padding: "10px 20px",
        marginBottom: 100,
      }}
    >
      <h4>Meu carinho</h4>
      {!!items.length && (
        <ul>
          {items.map(function (item) {
            return (
              <li key={item._id}>
                {item.name}
                <b style={{ marginLeft: 10 }}>Preco: </b>
                {item.price} MZN
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
