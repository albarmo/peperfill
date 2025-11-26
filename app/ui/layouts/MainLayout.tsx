import { Outlet } from "@remix-run/react";

export default function MainLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}
