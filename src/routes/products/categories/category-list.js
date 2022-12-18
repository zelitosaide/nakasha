import { useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/productCategories");
  const categories = await response.json();
  return categories.items;
}

export function CategoryList() {
  const categories = useLoaderData();
  console.log(categories);

  return (
    <div>
      <h4>Products categories List</h4>
      {!!categories.length && (
        <ul>
          {categories.map(function (category) {
            return <li key={category._id}>{category.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
