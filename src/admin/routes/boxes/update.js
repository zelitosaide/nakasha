import { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { baseUrl } from "../../../api";
import { convertTobase64 } from "../../../utils/file-to-base64";

export async function action({ request, params }) {
  const boxId = params.boxId;
  const formData = await request.formData();
  const name = formData.get("name");
  const category = formData.get("category");
  const image = formData.get("image");
  const imageUrl = await convertTobase64(image);
  const price = !isNaN(formData.get("price"))
    ? Number(formData.get("price"))
    : 0;
  const description = formData.get("description");
  const products = JSON.parse(formData.get("products"));

  const response = await fetch(baseUrl + "/boxes/" + boxId);
  const box = await response.json();

  if (!box.boxItemsId) {
    const boxItemsResponse = await fetch(baseUrl + "/boxItems", {
      method: "POST",
      body: JSON.stringify({ products }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const { _id: boxItemsId } = await boxItemsResponse.json();
    await fetch(baseUrl + "/boxes/" + boxId, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        description,
        category,
        imageUrl,
        price,
        boxItemsId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } else {
    await fetch(baseUrl + "/boxes/" + boxId, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        description,
        category,
        imageUrl,
        price,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return redirect("/dashboard/boxes");
}

export async function loader({ params }) {
  const boxId = params.boxId;
  const response = await fetch(baseUrl + "/boxes/" + boxId);
  const box = await response.json();

  const responseBoxCategories = await fetch(baseUrl + "/boxCategories");
  const boxCategories = await responseBoxCategories.json();

  const productsResponse = await fetch(baseUrl + "/products?limit=100");
  const products = await productsResponse.json();

  if (box.boxItemsId) {
    const boxItemsResponse = await fetch(
      baseUrl + "/boxItems/" + box.boxItemsId
    );
    const boxItems = await boxItemsResponse.json();

    return { box, boxCategories, products, boxItems };
  }

  return { box, boxCategories, products };
}

export function UpdateBox() {
  const {
    box,
    boxCategories: { items },
    boxItems,
    products: { items: products },
  } = useLoaderData();
  const [boxItemsState, setBoxItemsState] = useState([]);
  const navigate = useNavigate();

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
        {boxItems &&
          boxItems.products.map(function (product) {
            return (
              <div key={product._id}>
                {product.name} <button>Delete</button> <button>Change</button>
              </div>
            );
          })}

        <h4>Add Box Products: </h4>
        <input
          name="products"
          readOnly
          value={JSON.stringify(boxItemsState)}
        />
        {!!products.length &&
          products.map(function (product) {
            return (
              <p key={product._id}>
                <label htmlFor={product._id}>{product.name} </label>
                <input
                  id={product._id}
                  aria-label={product.name}
                  type="checkbox"
                  onChange={function () {
                    const productExist = boxItemsState.find(function (item) {
                      return item._id === product._id;
                    });
                    if (!productExist) {
                      setBoxItemsState(function (boxItemsState) {
                        return [...boxItemsState, product];
                      });
                    }
                    if (productExist) {
                      const filteredBoxItems = boxItemsState.filter(function (
                        item
                      ) {
                        return item._id !== product._id;
                      });
                      setBoxItemsState(filteredBoxItems);
                    }
                  }}
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
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
