import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <div>
      <h4>Root Admin</h4>
      <Outlet />
    </div>
  );
}
