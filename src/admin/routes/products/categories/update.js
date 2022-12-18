import { Form, useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../../api";

export async function loader({ params }) {
  const categoryId = params.categoryId;
  const response = await fetch(baseUrl + "/productCategories/" + categoryId);
  return await response.json();
}

export function UpdateProductCategory() {
  const category = useLoaderData();
  console.log(category);

  return (
    <div>
      <h4>Edit Product Category</h4>
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
            disabled
            defaultValue={category.name}
          />
        </p>
      </Form>
    </div>
  );
}

// description: "Some content..."
// ​
// imageUrl: ""
// ​
// name: "hortalica"
