import { Form, useLoaderData, useNavigate } from "react-router-dom";

import { convertTobase64 } from "../../utils/file-to-base64";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const category = formData.get("category");
  const image = formData.get("image");
  const price = formData.get("price");
  const imageUrl = await convertTobase64(image);
  console.log({ name, category, imageUrl, price });
}

export function Create() {
  const { items: categories } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "100px 0" }}>
      <h4>Create Product</h4>
      <Form
        method="post"
        encType="multipart/form-data"
      >
        <p>
          <label htmlFor="product-name">Product Name: </label>
          <input
            id="product-name"
            aria-label="Product Name"
            name="name"
            type="text"
          />
        </p>

        <p>
          <label htmlFor="product-category">Product Category: </label>
          <select
            id="product-category"
            aria-label="Product Category"
            name="category"
          >
            {!!categories.length &&
              categories.map(function (category) {
                return <option key={category._id}>{category.name}</option>;
              })}
          </select>
        </p>

        <p>
          <label htmlFor="product-image">Product Image: </label>
          <input
            id="product-image"
            aria-label="Product Image"
            name="image"
            type="file"
          />
        </p>

        <p>
          <label htmlFor="product-price">Product Price: </label>
          <input
            id="product-price"
            aria-label="Product Price"
            name="price"
            type="text"
          />
        </p>

        <p>
          <button
            type="submit"
            style={{ marginRight: 10 }}
          >
            Create
          </button>
          <button
            type="button"
            onClick={function () {
              navigate("/products");
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
