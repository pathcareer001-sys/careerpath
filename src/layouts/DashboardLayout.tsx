import { Outlet } from "react-router-dom";

import AppNavbar from "@/components/navigation/AppNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <Outlet />
      </main>
    </div>
  );
}
