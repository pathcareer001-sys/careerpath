import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Shield, Building2, Star, Flag, LogOut, LayoutDashboard, Menu } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";
import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const staffNav = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/staff/reviews", label: "Review Moderation", icon: Star },
  { to: "/staff/verification", label: "Verify Companies", icon: Building2 },
  { to: "/staff/reports", label: "Reports", icon: Flag },
];

const sidebarContent = (handleLogout: () => void) => (
  <div className="flex flex-col h-full">
    <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="flex items-center gap-2">
        <img src={logo} alt="CareerPath" className="h-7 brightness-0 invert" />
      </div>
    </div>
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {staffNav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          <item.icon size="18" />
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="px-3 py-3 border-t border-slate-200">
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <LogOut size="18" />
        Logout
      </button>
    </div>
  </div>
);

export default function StaffLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex">
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0">
        {sidebarContent(handleLogout)}
      </aside>

      <Sheet>
        <SheetTrigger className="fixed top-3 left-3 z-50 inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 shadow-sm">
          <Menu size="18" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent(handleLogout)}
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-end px-6 gap-3 pl-14 md:pl-6">
          <NotificationDropdown />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600 border border-purple-200">
            <Shield size="12" />
            Staff
          </span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
