import { useContext } from "react";

import { CartContext } from "../../../provider";

export function Cart() {
  const {
    cart: { boxes, products, recipes },
  } = useContext(CartContext);

  console.log(boxes, products, recipes);

  return (
    <div>
      <h4>Meu carinho</h4>
    </div>
  );
}
