import { redirect } from "react-router-dom";

import { baseUrl } from "../../../api";

export async function action({ params }) {
  const boxId = params.boxId;
  await fetch(`${baseUrl}/boxes/${boxId}`, {
    method: "DELETE",
  });
  return redirect("/dashboard/boxes");
}
