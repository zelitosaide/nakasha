import { Link, useLoaderData } from "react-router-dom";

import { baseUrl } from "../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/products?limit=10");
  const products = await response.json();
  return products.items;
}

export function ProductList() {
  const products = useLoaderData();

  console.log(products);

  return (
    <div style={{ padding: "100px 0" }}>
      <h4>Product List</h4>
      {!!products.length && (
        <ul>
          {products.map(function (product) {
            return (
              <li key={product._id}>
                {product.name}
                <Link
                  style={{ marginLeft: 10 }}
                  to={`/products/${product.category}/${product._id}/edit`}
                >
                  Edit
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
