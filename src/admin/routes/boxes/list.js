import { Form, Link, useLoaderData } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/boxes?limit=100");
  const boxes = await response.json();
  return boxes.items;
}

export function BoxList() {
  const boxes = useLoaderData();

  return (
    <div>
      <h4>Box List</h4>
      {!!boxes.length && (
        <ul>
          {boxes.map(function (box) {
            return (
              <li key={box._id}>
                {box.name}
                <Link
                  style={{ marginLeft: 10, marginRight: 10 }}
                  to={`${box._id}/edit`}
                >
                  Edit
                </Link>
                <Form
                  method="post"
                  action={`${box._id}/delete`}
                >
                  <button type="submit">Delete</button>
                </Form>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
