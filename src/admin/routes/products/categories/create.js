import { Form, redirect, useNavigate } from "react-router-dom";

import { baseUrl } from "../../../../api";
import { convertTobase64 } from "../../../../utils/file-to-base64";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");
  const imageUrl = await convertTobase64(image);
  await fetch(baseUrl + "/productCategories", {
    method: "POST",
    body: JSON.stringify({ name, description, imageUrl }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return redirect("/dashboard/products/categories");
}

export function CreateProductCategory() {
  const navigate = useNavigate();

  return (
    <div>
      <h4>Create Product Category</h4>
      <Form
        method="post"
        encType="multipart/form-data"
      >
        <p>
          <label htmlFor="category-name">Category Name: </label>
          <input
            id="category-name"
            aria-label="Category Name"
            name="name"
            type="text"
          />
        </p>
        <p>
          <label htmlFor="category-description">Category Description: </label>
          <textarea
            id="category-description"
            aria-label="Category Description"
            name="description"
          />
        </p>
        <p>
          <label htmlFor="category-image">Category Image: </label>
          <input
            id="category-image"
            aria-label="Category Image"
            name="image"
            type="file"
          />
        </p>
        <p>
          <button
            type="submit"
            style={{ marginRight: 10 }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={function () {
              navigate("/dashboard/products/categories");
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
