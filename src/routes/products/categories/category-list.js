import { useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/productCategories");
  const categories = await response.json();
  return categories;
}

export function CategoryList() {
  const categories = useLoaderData();

  // return ();
  console.log(categories);
}
