import { NavLink, Link, useNavigate } from "react-router-dom";

import { LayoutDashboard, Briefcase, User, LogOut, Menu } from "lucide-react";

import UserMenu from "./UserMenu";

import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";
import AppButton from "../common/AppButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/company", label: "Dashboard", icon: LayoutDashboard },
  { to: "/company/internships", label: "Internships", icon: Briefcase },
  { to: "/company/profile", label: "Profile", icon: User },
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
    <header
      className="
      sticky
      top-0
      z-50
      bg-white
      border-b
      border-slate-200
      "
    >
      <div
        className="
  max-w-7xl
  mx-auto
  h-16
  px-4
  flex
  items-center
  md:h-20
  md:px-6
  "
      >
        <img src={logo} alt="CareerPath" className="h-12 w-auto md:h-16" />
        <nav
          className="
  ml-4
  hidden
  md:flex
  items-center
  gap-4
  md:ml-10
  md:gap-10
  "
        >
          {navLinks.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={<item.icon size={18} />}
              label={item.label}
            />
          ))}
        </nav>

        <div
          className="
  ml-auto
  flex
  items-center
  gap-3
  "
        >
          <AppButton
            variant="secondary"
            onClick={handleLogout}
            className="
  border-red-200
  text-red-600
  hover:bg-red-50
  hidden
  sm:inline-flex
  "
          >
            <LogOut size={16} />
            Logout
          </AppButton>

          <UserMenu />

          <Sheet>
            <SheetTrigger className="inline-flex md:hidden p-2 rounded-lg text-[#64748B] hover:bg-blue-50">
              <Menu size="20" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 h-14 border-b border-[#E2E8F0]">
                  <img src={logo} alt="CareerPath" className="h-6 w-auto" />
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
                            ? "bg-blue-50 text-[#2563EB] font-medium"
                            : "text-[#64748B] hover:bg-blue-50 hover:text-[#2563EB]"
                        }`
                      }
                    >
                      <item.icon size="18" />
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="px-3 py-3 border-t border-[#E2E8F0] space-y-2">
                  <Link
                    to="/company/profile"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#64748B] hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                  >
                    <User size="18" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
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
        `
        flex
        flex-col
        items-center
        min-w-[60px]
        gap-1
        px-2
        py-2
        text-xs
        border-b-2
        transition-colors
        ${
          isActive
            ? "border-blue-600 text-blue-600 font-medium"
            : "border-transparent text-slate-500 hover:text-slate-900"
        }
        `
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
