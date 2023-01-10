import { useContext } from "react";

import { CartContext } from "../../../provider";

export function Cart() {
  const {
    cart: { boxes, products, recipes },
  } = useContext(CartContext);

  console.log(boxes, products, recipes);

  return (
    <div>
      {}
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          // paddingBottom: 12,
          color: "#444",
          padding: "0 20px",
        }}
      >
        Carinho
      </p>
    </div>
  );
}
