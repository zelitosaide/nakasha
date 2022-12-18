import { Form } from "react-router-dom";

export function UpdateProductCategory() {
  return (
    <div>
      <h4>Edit Product</h4>
      <Form
        method="post"
        encType="multipart/form-data"
      ></Form>
    </div>
  );
}
