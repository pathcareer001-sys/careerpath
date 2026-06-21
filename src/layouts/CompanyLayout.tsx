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
        px-4 py-4 md:px-6 md:py-6
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
