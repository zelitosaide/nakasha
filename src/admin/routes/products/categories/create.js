import { Form, useNavigate } from "react-router-dom";

export async function action() {}

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
