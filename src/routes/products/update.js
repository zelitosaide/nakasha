import { Form, useLoaderData, useNavigate } from "react-router-dom";

import { baseUrl } from "../../api";

export async function action() {}

export async function loader({ params }) {
  const productId = params.productId;
  const response = await fetch(baseUrl + "/products/" + productId);
  return await response.json();
}

export function UpdateProduct() {
  const product = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "100px 0" }}>
      <h4>Edit Product</h4>
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
            defaultValue={product.name}
          />
        </p>

        {/* <p>
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
        </p> */}

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
            defaultValue={product.price}
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
              navigate(-2);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
