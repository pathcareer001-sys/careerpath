import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Bookmark,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import UserMenu from "./UserMenu";
import { authService } from "@/features/auth/services/authService";
import logo from "@/assets/images/logo.png";
import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import ThemeToggle from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:h-20 md:px-8">
        <div className="shrink-0">
          <img src={logo} alt="CareerPath" className="h-9 w-auto md:h-12" />
        </div>

        <nav className="hidden md:flex ml-4 items-center gap-1 md:ml-10">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-subtle text-primary shadow-sm"
                    : "text-body hover:text-primary hover:bg-primary-subtle/50",
                ].join(" ")
              }
            >
              <Icon size={16} />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <NotificationDropdown />

          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-body transition-all duration-200 hover:border-primary/30 hover:bg-primary-subtle hover:text-primary"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>

          <UserMenu />

          <Sheet>
            <SheetTrigger className="inline-flex md:hidden p-2 rounded-lg text-secondary-text hover:bg-primary-subtle transition-colors">
              <Menu size="20" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 h-14 border-b border-border">
                  <img src={logo} alt="CareerPath" className="h-9 w-auto" />
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                  {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-primary-subtle text-primary font-medium"
                            : "text-secondary-text hover:bg-primary-subtle hover:text-primary"
                        }`
                      }
                    >
                      <Icon size="18" />
                      {label}
                    </NavLink>
                  ))}
                </nav>
                <div className="px-3 py-3 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-error hover:bg-error/10 transition-colors"
                  >
                    <LogOut size="18" />
                    Logout
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
