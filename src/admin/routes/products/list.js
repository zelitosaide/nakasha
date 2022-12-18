import { Link, useLoaderData, Form } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/products?limit=100");
  const products = await response.json();
  return products.items;
}

export function ProductList() {
  const products = useLoaderData();

  return (
    <div>
      <h4>Product List</h4>
      {!!products.length && (
        <ul>
          {products.map(function (product) {
            return (
              <li key={product._id}>
                {product.name}
                <Link
                  style={{ marginLeft: 10, marginRight: 10 }}
                  to={`${product._id}/edit`}
                >
                  Edit
                </Link>
                <Form
                  method="post"
                  action={`${product._id}/delete`}
                >
                  <button type="submit">Delete</button>
                </Form>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
