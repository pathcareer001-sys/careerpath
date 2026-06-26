import { NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  Briefcase,
  Bookmark,
  FileText,
  LayoutDashboard,
  LogOut,
  Shield,
  Star,
  User,
  Users,
} from "lucide-react";

import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/constants/roles";

const studentNav = [
  { label: "Main", items: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/companies", icon: Building2, label: "Companies" },
    { to: "/internships", icon: Briefcase, label: "Internships" },
  ]},
  { label: "Tracking", items: [
    { to: "/applications", icon: FileText, label: "Applications" },
    { to: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  ]},
  { label: "Account", items: [
    { to: "/profile", icon: User, label: "Profile" },
  ]},
];

const adminNav = [
  { label: "Admin", items: [
    { to: "/admin", icon: Shield, label: "Dashboard" },
    { to: "/admin/companies", icon: Building2, label: "Companies" },
    { to: "/admin/internships", icon: Briefcase, label: "Internships" },
    { to: "/admin/applications", icon: FileText, label: "Applications" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/reviews", icon: Star, label: "Reviews" },
  ]},
];

const companyNav = [
  { label: "Company", items: [
    { to: "/company", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/company/internships", icon: Briefcase, label: "Internships" },
    { to: "/company/profile", icon: User, label: "Profile" },
  ]},
];

export default function AppSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navGroups =
    user?.role === ROLES.ADMIN ? adminNav
    : user?.role === ROLES.COMPANY ? companyNav
    : studentNav;

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="px-4 py-4 border-b border-slate-100">
        <img src={logo} alt="CareerPath" className="h-8" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-medium tracking-[0.8px] text-slate-400 uppercase">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin" || item.to === "/company" || item.to === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-sidebar-active text-blue-600 font-medium"
                        : "text-slate-600 hover:bg-surface-alt hover:text-slate-700"
                    }`
                  }
                >
                  <item.icon size="18" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size="18" />
          Logout
        </button>
      </div>
    </aside>
  );
}
