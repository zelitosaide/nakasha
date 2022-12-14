import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { baseUrl } from "../../../api";
import { convertTobase64 } from "../../../utils/file-to-base64";

export async function action({ request, params }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const category = formData.get("category");
  const image = formData.get("image");
  const imageUrl = await convertTobase64(image);
  const price = !isNaN(formData.get("price"))
    ? Number(formData.get("price"))
    : 0;

  // const response = await fetch(baseUrl + "/products/" + params.productId, {
  await fetch(baseUrl + "/products/" + params.productId, {
    method: "PATCH",
    body: JSON.stringify({ name, category, imageUrl, price }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  // const result = await response.json();
  // await response.json();
  return redirect("/dashboard/products");
}

export async function loader({ params }) {
  const productId = params.productId;
  const response = await fetch(baseUrl + "/products/" + productId);
  const product = await response.json();

  const responseProductCategories = await fetch(baseUrl + "/productCategories");
  const productCategories = await responseProductCategories.json();

  return { product, productCategories };
}

export function UpdateProduct() {
  const {
    product,
    productCategories: { items },
  } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
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

        <p>
          <label htmlFor="product-category">Product Category: </label>
          <select
            id="product-category"
            aria-label="Product Category"
            name="category"
            defaultValue={product.category}
          >
            {!!items.length &&
              items.map(function (category) {
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
            defaultValue={product.price}
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
              navigate("/dashboard/products");
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
