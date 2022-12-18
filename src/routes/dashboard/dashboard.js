import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div>
      <h4>Dashboard</h4>
      <Outlet />
    </div>
  );
}
