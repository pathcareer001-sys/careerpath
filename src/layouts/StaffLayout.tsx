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
    <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
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
                ? "bg-accent text-primary font-medium"
                : "text-body hover:bg-section"
            }`
          }
        >
          <item.icon size="18" />
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="px-3 py-3 border-t border-border">
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:bg-error/10 hover:text-error transition-colors"
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
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-64 bg-surface border-r border-border flex-col shrink-0">
        {sidebarContent(handleLogout)}
      </aside>

      <Sheet>
        <SheetTrigger className="fixed top-3 left-3 z-50 inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg bg-surface border border-border text-body shadow-sm">
          <Menu size="18" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent(handleLogout)}
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-surface/80 backdrop-blur-xl border-b border-border flex items-center justify-end px-6 gap-3 pl-14 md:pl-6">
          <NotificationDropdown />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-info/10 px-3 py-1 text-xs font-medium text-info border border-info/30">
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
