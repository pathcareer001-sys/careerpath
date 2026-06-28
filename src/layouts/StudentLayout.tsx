import { Outlet } from "react-router-dom";
import TopBar from "@/components/navigation/TopBar";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
