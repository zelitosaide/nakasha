import { Form, useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function action() {}

export async function loader({ params }) {
  const boxId = params.boxId;
  const response = await fetch(baseUrl + "/boxes/" + boxId);
  const box = await response.json();

  const responseBoxCategories = await fetch(baseUrl + "/boxCategories");
  const boxCategories = await responseBoxCategories.json();

  return { box, boxCategories };

  // const response = await fetch(baseUrl + "/boxCategories");
  // const boxCategories = await response.json();
  // const productsResponse = await fetch(baseUrl + "/products?limit=100");
  // const products = await productsResponse.json();
  // return { boxCategories, products };
}

export function UpdateBox() {
  const {
    box,
    boxCategories: { items },
  } = useLoaderData();

  console.log({ box, items });

  return (
    <div>
      <h4>Edit Box</h4>
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
            defaultValue={box.name}
          />
        </p>
        <p>
          <label htmlFor="box-category">Box Category: </label>
          <select
            id="box-category"
            aria-label="Box Category"
            name="category"
            defaultValue={box.category}
          >
            {!!items.length &&
              items.map(function (category) {
                return <option key={category._id}>{category.name}</option>;
              })}
          </select>
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
          <label htmlFor="box-price">Box Price: </label>
          <input
            id="box-price"
            aria-label="Box Price"
            name="price"
            type="text"
            defaultValue={box.price}
          />
        </p>
        <p>
          <label htmlFor="box-description">Box Description: </label>
          <textarea
            id="box-description"
            aria-label="Box Description"
            name="description"
            defaultValue={box.description}
          />
        </p>
      </Form>
    </div>
  );
}

// boxItemsId: String,