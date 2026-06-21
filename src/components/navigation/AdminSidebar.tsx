import { NavLink } from "react-router-dom";

import { Building2, Briefcase, FileText, Shield } from "lucide-react";

import logo from "@/assets/images/logo.png";

export default function AdminSidebar() {
  return (
    <aside
      className="
      w-72
      bg-white
      border-r
      border-slate-200
      "
    >
      <div className="p-6">
        <img src={logo} alt="CareerPath" className="h-14" />
      </div>

      <nav className="px-4 space-y-2">
        <AdminNavItem
          to="/admin"
          icon={<Shield size={18} />}
          label="Dashboard"
        />

        <AdminNavItem
          to="/admin/companies"
          icon={<Building2 size={18} />}
          label="Companies"
        />

        <AdminNavItem
          to="/admin/internships"
          icon={<Briefcase size={18} />}
          label="Internships"
        />

        <AdminNavItem
          to="/admin/applications"
          icon={<FileText size={18} />}
          label="Applications"
        />
      </nav>
    </aside>
  );
}

function AdminNavItem({
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
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-colors
        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-100"
        }
        `
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
