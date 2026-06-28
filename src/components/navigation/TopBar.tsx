import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Building2, Briefcase, FileText, Bookmark, LogOut, Menu } from "lucide-react";

import logo from "@/assets/images/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import { authService } from "@/features/auth/services/authService";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const studentNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/internships", label: "Internships", icon: Briefcase },
  { to: "/applications", label: "Applications", icon: FileText },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/companies", label: "Companies", icon: Building2 },
  { to: "/admin/internships", label: "Internships", icon: Briefcase },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Building2 },
  { to: "/admin/reviews", label: "Reviews", icon: FileText },
];

const companyNav = [
  { to: "/company", label: "Dashboard", icon: LayoutDashboard },
  { to: "/company/internships", label: "Internships", icon: Briefcase },
  { to: "/company/profile", label: "Profile", icon: Building2 },
];

export default function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navLinks =
    user?.role === ROLES.ADMIN ? adminNav
    : user?.role === ROLES.COMPANY ? companyNav
    : studentNav;

  const profilePath = user?.role === ROLES.COMPANY ? "/company/profile" : "/profile";

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <header className="h-[60px] bg-surface/80 backdrop-blur-xl border-b border-border flex items-center px-4 md:px-6 gap-3 sticky top-0 z-50">
      <Link to="/" className="shrink-0">
        <img src={logo} alt="CareerPath" className="h-9 w-auto md:h-12" />
      </Link>

      <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard" || item.to === "/admin" || item.to === "/company"}
            className={({ isActive }) =>
              `relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-secondary-text hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size="16" className={isActive ? "text-primary" : ""} />
                {item.label}
                {isActive && <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-primary rounded-full" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />
        <NotificationDropdown />

        <Link to={profilePath} className="hidden sm:flex items-center gap-2 p-1 rounded-lg hover:bg-primary-subtle transition-all duration-200">
          <img
            src={user?.photoURL || "https://ui-avatars.com/api/?name=User&background=EBF3FA&color=4682B4&size=32"}
            alt=""
            className="w-7 h-7 rounded-full ring-2 ring-primary/15"
          />
          <span className="text-sm text-secondary-text hidden md:inline">{user?.name || "User"}</span>
        </Link>

        <button
          onClick={handleLogout}
          className="hidden sm:inline-flex p-2 rounded-lg text-muted hover:bg-error/10 hover:text-error transition-all duration-200"
          title="Logout"
        >
          <LogOut size="16" />
        </button>

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
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/dashboard" || item.to === "/admin" || item.to === "/company"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary-subtle text-primary font-medium"
                          : "text-secondary-text hover:bg-primary-subtle hover:text-primary"
                      }`
                    }
                  >
                    <item.icon size="18" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="px-3 py-3 border-t border-border space-y-2">
                <Link
                  to={profilePath}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:bg-primary-subtle hover:text-primary transition-colors"
                >
                  <img
                    src={user?.photoURL || "https://ui-avatars.com/api/?name=User&background=EBF3FA&color=4682B4&size=32"}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                  {user?.name || "User"}
                </Link>
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
    </header>
  );
}
