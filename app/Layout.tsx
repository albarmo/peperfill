import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F1ECE6]">
      <div className="relative h-screen md:h-[95vh] md:w-[414px] md:rounded-xl overflow-hidden">
          <Outlet />
      </div>
    </div>
  );
}