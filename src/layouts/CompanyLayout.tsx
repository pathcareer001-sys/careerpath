import { Outlet } from "react-router-dom";
import TopBar from "@/components/navigation/TopBar";

export default function CompanyLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
