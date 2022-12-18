import { useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";

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
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Image:</strong>{" "}
        <img
          src={product.imageUrl}
          alt={product.name}
        />
      </p>
      <p>
        <strong>Price:</strong> {product.price}
      </p>
    </div>
  );
}
