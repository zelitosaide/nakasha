import { Form, useLoaderData, useNavigate } from "react-router-dom";

import { baseUrl } from "../../../api";
import { convertTobase64 } from "../../../utils/file-to-base64";

export async function action({ request }) {
  // boxItemsId: ""
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("image");
  const imageUrl = await convertTobase64(image);
  const price = !isNaN(formData.get("price"))
    ? Number(formData.get("price"))
    : 0;
  // console.log({ name, description, category, imageUrl, price });
  // const response = await fetch(baseUrl + "/products", {
  //   method: "POST",
  //   body: JSON.stringify({ name, category, imageUrl, price }),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // });
}

export async function loader() {
  const response = await fetch(baseUrl + "/boxCategories");
  const boxCategories = await response.json();
  const productsResponse = await fetch(baseUrl + "/products?limit=100");
  const products = await productsResponse.json();
  return { boxCategories, products };
}

export function CreateBox() {
  const {
    boxCategories: { items: categories },
    products: { items: products },
  } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <h4>Create Box</h4>
      <Form
        method="post"
        encType="multipart/form-data"
      >
        <p>
          <label htmlFor="box-name">Box Name: </label>
          <input
            id="box-name"
            aria-label="Box Name"
            name="name"
            type="text"
          />
        </p>
        <p>
          <label htmlFor="box-description">Box Description: </label>
          <textarea
            id="box-description"
            aria-label="Box Description"
            name="description"
          />
        </p>
        <p>
          <label htmlFor="box-price">Box Price: </label>
          <input
            id="box-price"
            aria-label="Box Price"
            name="price"
            type="text"
          />
        </p>
        <p>
          <label htmlFor="box-image">Box Image: </label>
          <input
            id="box-image"
            aria-label="Box Image"
            name="image"
            type="file"
          />
        </p>
        <p>
          <label htmlFor="box-category">Box Category: </label>
          <select
            id="box-category"
            aria-label="Box Category"
            name="category"
          >
            {!!categories.length &&
              categories.map(function (category) {
                return <option key={category._id}>{category.name}</option>;
              })}
          </select>
        </p>

        <h4>Box Products: </h4>
        {!!products.length &&
          products.map(function (product) {
            return (
              <p key={product._id}>
                <label htmlFor={product._id}>{product.name} </label>
                <input
                  id={product._id}
                  aria-label={product.name}
                  name="products"
                  type="checkbox"
                />
              </p>
            );
          })}

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
              navigate("/boxes");
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
