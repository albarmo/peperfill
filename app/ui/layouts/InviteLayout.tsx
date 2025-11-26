import { Outlet, useParams } from "@remix-run/react";

export default function InviteLayout() {
  const params = useParams();

  return (
    <div className="bg-yellow-50">
      <Outlet />
    </div>
  );
}
