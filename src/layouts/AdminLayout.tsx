import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/navigation/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
