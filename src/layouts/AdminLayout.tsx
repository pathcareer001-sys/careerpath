import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/navigation/AppSidebar";
import TopBar from "@/components/navigation/TopBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
