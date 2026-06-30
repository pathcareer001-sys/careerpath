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
  { label: "Utama", items: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/companies", icon: Building2, label: "Perusahaan" },
    { to: "/internships", icon: Briefcase, label: "Magang" },
  ]},
  { label: "Pelacakan", items: [
    { to: "/applications", icon: FileText, label: "Lamaran" },
    { to: "/bookmarks", icon: Bookmark, label: "Tersimpan" },
  ]},
  { label: "Akun", items: [
    { to: "/profile", icon: User, label: "Profil" },
  ]},
];

const adminNav = [
  { label: "Admin", items: [
    { to: "/admin", icon: Shield, label: "Dashboard" },
    { to: "/admin/companies", icon: Building2, label: "Perusahaan" },
    { to: "/admin/internships", icon: Briefcase, label: "Magang" },
    { to: "/admin/applications", icon: FileText, label: "Lamaran" },
    { to: "/admin/users", icon: Users, label: "Pengguna" },
    { to: "/admin/reviews", icon: Star, label: "Ulasan" },
  ]},
];

const companyNav = [
  { label: "Perusahaan", items: [
    { to: "/company", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/company/internships", icon: Briefcase, label: "Magang" },
    { to: "/company/profile", icon: User, label: "Profil" },
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
    <aside className="w-[240px] min-h-screen bg-surface border-r border-border flex flex-col shrink-0">
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <img src={logo} alt="CareerPath" className="h-12" />
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-semibold tracking-[1px] text-muted uppercase">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin" || item.to === "/company" || item.to === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-primary-subtle text-primary font-medium"
                        : "text-body hover:bg-primary-subtle/50 hover:text-primary"
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

      <div className="px-3 py-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:bg-error/10 hover:text-error transition-colors"
        >
          <LogOut size="18" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
