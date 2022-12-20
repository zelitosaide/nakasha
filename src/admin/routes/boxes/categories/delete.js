import { redirect } from "react-router-dom";

import { baseUrl } from "../../../../api";

export async function action({ params }) {
  const categoryId = params.categoryId;
  await fetch(`${baseUrl}/boxCategories/${categoryId}`, {
    method: "DELETE",
  });
  return redirect("/dashboard/boxes/categories");
}
