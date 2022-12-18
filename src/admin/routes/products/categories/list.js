import { Form, Link, useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/productCategories");
  const categories = await response.json();
  return categories.items;
}

export function CategoryList() {
  const categories = useLoaderData();

  return (
    <div>
      <h4>Products categories List</h4>
      {!!categories.length && (
        <ul>
          {categories.map(function (category) {
            return (
              <li key={category._id}>
                {category.name}
                <Link
                  style={{ marginLeft: 10, marginRight: 10 }}
                  to={`${category._id}/edit`}
                >
                  Edit
                </Link>
                <Form
                  method="post"
                  action={`${category._id}/delete`}
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
