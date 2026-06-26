import { NavLink, useNavigate } from "react-router-dom";

import {
  Building2,
  Briefcase,
  FileText,
  Shield,
  Users,
  Star,
  LogOut,
} from "lucide-react";

import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();

    navigate("/login");
  };
  return (
    <aside
      className="
  w-72
  bg-white
  border-r
  border-slate-200
  min-h-screen
  flex
  flex-col
  "
    >
      <div className="p-6">
        <img src={logo} alt="CareerPath" className="h-14" />
      </div>

      <div className="flex h-full flex-col">
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
          <AdminNavItem
            to="/admin/users"
            icon={<Users size={18} />}
            label="Users"
          />

          <AdminNavItem
            to="/admin/reviews"
            icon={<Star size={18} />}
            label="Reviews"
          />
        </nav>

        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="
      w-full
      flex
      items-center
      gap-3
      rounded-xl
      px-4
      py-3
      text-red-600
      hover:bg-red-50
      transition-colors
      "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
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
      end={to === "/admin"}
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
