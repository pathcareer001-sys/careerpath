import { Outlet } from "react-router-dom";

import AppNavbar from "@/components/navigation/AppNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
