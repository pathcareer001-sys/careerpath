import { Outlet } from "react-router-dom";

import AppNavbar from "@/components/navigation/AppNavbar";

export default function StudentLayout() {
  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      flex
      flex-col
      "
    >
      <AppNavbar />

      <main
        className="
        flex-1
        max-w-7xl
        mx-auto
        w-full
        px-4 py-6 md:px-6 md:py-8
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
