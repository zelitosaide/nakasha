import { useLoaderData } from "react-router-dom";

export function UpdateProduct() {
  const product = useLoaderData();
  console.log(product);

  return (
    <div style={{ padding: "100px 0" }}>
      <h4>Edit Product</h4>
    </div>
  );
}
