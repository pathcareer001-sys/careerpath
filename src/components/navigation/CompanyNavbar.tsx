import { NavLink } from "react-router-dom";

import { LayoutDashboard, Briefcase, Users, User } from "lucide-react";

import UserMenu from "./UserMenu";

import logo from "@/assets/images/logo.png";

export default function CompanyNavbar() {
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
        h-20
        px-6
        flex
        items-center
        "
      >
        <img src={logo} alt="CareerPath" className="h-16 w-auto" />

        <nav
          className="
          ml-10
          flex
          items-center
          gap-10
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
            to="/company/applicants"
            icon={<Users size={18} />}
            label="Applicants"
          />

          <NavItem
            to="/company/profile"
            icon={<User size={18} />}
            label="Profile"
          />
        </nav>

        <div className="ml-auto">
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
      className={({ isActive }) =>
        `
        flex
        flex-col
        items-center
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
