import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Bookmark,
  FileText,
  LogOut,
} from "lucide-react";

import UserMenu from "./UserMenu";
import { authService } from "@/features/auth/services/authService";
import logo from "@/assets/images/logo.png";
import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import { toast } from "sonner";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/companies", icon: Building2, label: "Companies" },
  { to: "/internships", icon: Briefcase, label: "Internships" },
  { to: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { to: "/applications", icon: FileText, label: "Applications" },
];

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:h-20 md:px-6">
        <div className="shrink-0">
          <img src={logo} alt="CareerPath" className="h-12 w-auto md:h-16" />
        </div>

        <nav className="ml-4 flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50/70 p-1 md:ml-10">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-blue-700",
                ].join(" ")
              }
            >
              <Icon size={16} />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <NotificationDropdown />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-blue-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
