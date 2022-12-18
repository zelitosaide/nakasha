import { redirect } from "react-router-dom";

import { baseUrl } from "../../api";

export async function action({ params }) {
  const productId = params.productId;
  await fetch(`${baseUrl}/products/${productId}`, {
    method: "DELETE",
  });
  return redirect("/products/list");
}
