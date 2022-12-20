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
      </Form>
    </div>
  );
}
