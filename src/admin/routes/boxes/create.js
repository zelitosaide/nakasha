import { Form } from "react-router-dom";

export async function action() {}

export async function loader() {}

export function CreateBox() {
  return (
    <div>
      <h4>Create Box</h4>
      <Form
        method="post"
        encType="multipart/form-data"
      ></Form>
    </div>
  );
}
