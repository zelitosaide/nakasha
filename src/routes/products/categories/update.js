import { Form } from "react-router-dom";

export async function loader() {}

export function UpdateProductCategory() {
  return (
    <div>
      <h4>Edit Product Category</h4>
      <Form
        method="post"
        encType="multipart/form-data"
      ></Form>
    </div>
  );
}
