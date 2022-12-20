import { Form, useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function action() {
  // boxItemsId: ""
}

export async function loader() {
  const response = await fetch(baseUrl + "/boxCategories");
  const boxCategories = await response.json();
  return boxCategories;
}

export function CreateBox() {
  const { items: categories } = useLoaderData();
  console.log(categories);

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
      </Form>
    </div>
  );
}
