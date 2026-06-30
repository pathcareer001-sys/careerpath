import { NavLink, Link, useNavigate } from "react-router-dom";

import { LayoutDashboard, Briefcase, User, LogOut, Menu } from "lucide-react";

import UserMenu from "./UserMenu";

import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";
import AppButton from "../common/AppButton";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/company", label: "Dashboard", icon: LayoutDashboard },
  { to: "/company/internships", label: "Magang", icon: Briefcase },
  { to: "/company/profile", label: "Profil", icon: User },
];

export default function CompanyNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:h-20 md:px-8">
        <img src={logo} alt="CareerPath" className="h-9 w-auto md:h-12" />
        <nav className="ml-4 hidden md:flex items-center gap-1 md:ml-10">
          {navLinks.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={<item.icon size={18} />}
              label={item.label}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <AppButton
            variant="secondary"
            onClick={handleLogout}
            className="border-error/30 text-error hover:bg-error/10 hidden sm:inline-flex"
          >
            <LogOut size={16} />
            Keluar
          </AppButton>

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
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/company"}
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
                    to="/company/profile"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:bg-primary-subtle hover:text-primary transition-colors"
                  >
                    <User size="18" />
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-error hover:bg-error/10 transition-colors"
                  >
                    <LogOut size="18" />
                    Keluar
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

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/company"}
      className={({ isActive }) =>
        `inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-primary-subtle text-primary shadow-sm"
            : "text-body hover:text-primary hover:bg-primary-subtle/50"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
