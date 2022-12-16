import { useLoaderData } from "react-router-dom";

import { baseUrl } from "../../api";

export async function loader({ params }) {
  const productId = params.productId;
  const response = await fetch(baseUrl + "/products/" + productId);
  return await response.json();
}

export function Product() {
  const product = useLoaderData();

  return (
    <div style={{ padding: "100px 0" }}>
      <h4>Product</h4>
    </div>
  );
}
