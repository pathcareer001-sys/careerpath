import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/navigation/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] flex">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
