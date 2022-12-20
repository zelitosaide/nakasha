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
    <div>
      <p>
        <strong>Nome do Produto:</strong> {product.name}
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
      <p>
        <b>Adicionar ao carinho</b>
      </p>
      <button>-</button>
      <span>10</span>
      <button>+</button>
    </div>
  );
}
