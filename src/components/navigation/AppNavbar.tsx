import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Bookmark,
  FileText,
} from "lucide-react";

import UserMenu from "./UserMenu";

import logo from "@/assets/images/logo.png";

export default function AppNavbar() {
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
      md:h-20
      md:px-6
        flex
        items-center
        "
      >
        {/* Logo */}

        <div className="shrink-0">
          <img src={logo} alt="CareerPath" className="h-12 md:h-16 w-auto" />
        </div>

        {/* Menu */}

        <nav
          className="
          flex
          items-center
          ml-4
          gap-4
          md:ml-10
          md:gap-10
          "
        >
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <NavItem
            to="/companies"
            icon={<Building2 size={18} />}
            label="Companies"
          />

          <NavItem
            to="/internships"
            icon={<Briefcase size={18} />}
            label="Internships"
          />

          <NavItem
            to="/bookmarks"
            icon={<Bookmark size={18} />}
            label="Bookmarks"
          />

          <NavItem
            to="/applications"
            icon={<FileText size={18} />}
            label="Applications"
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
        transition-colors
        duration-200
        border-b-2
        min-w-[60px]
        ${
          isActive
            ? "border-blue-500 text-blue-600 font-medium"
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
