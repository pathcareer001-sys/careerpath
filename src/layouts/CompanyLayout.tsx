import { Outlet } from "react-router-dom";

import CompanyNavbar from "@/components/navigation/CompanyNavbar";

export default function CompanyLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <CompanyNavbar />

      <main
        className="
        max-w-7xl
        mx-auto
        px-6
        py-6
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
