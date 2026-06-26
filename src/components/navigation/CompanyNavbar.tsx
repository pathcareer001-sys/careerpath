import { NavLink, useNavigate } from "react-router-dom";

import { LayoutDashboard, Briefcase, User, LogOut } from "lucide-react";

import UserMenu from "./UserMenu";

import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";
import AppButton from "../common/AppButton";

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
  flex
  items-center
  gap-4
  md:ml-10
  md:gap-10
  "
        >
          <NavItem
            to="/company"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <NavItem
            to="/company/internships"
            icon={<Briefcase size={18} />}
            label="Internships"
          />

          <NavItem
            to="/company/profile"
            icon={<User size={18} />}
            label="Profile"
          />
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
  "
          >
            <LogOut size={16} />
            Logout
          </AppButton>

          <UserMenu />
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
