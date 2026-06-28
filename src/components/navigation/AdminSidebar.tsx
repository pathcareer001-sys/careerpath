import { NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  Briefcase,
  FileText,
  Shield,
  Users,
  Star,
  LogOut,
  Menu,
} from "lucide-react";

import logo from "@/assets/images/logo.png";
import { authService } from "@/features/auth/services/authService";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { to: "/admin", Icon: Shield, label: "Dashboard", end: true },
  { to: "/admin/companies", Icon: Building2, label: "Companies" },
  { to: "/admin/internships", Icon: Briefcase, label: "Internships" },
  { to: "/admin/applications", Icon: FileText, label: "Applications" },
  { to: "/admin/users", Icon: Users, label: "Users" },
  { to: "/admin/reviews", Icon: Star, label: "Reviews" },
];

function NavLinkItem({ to, Icon, label, end }: { to: string; Icon: React.ComponentType<{ size?: number }>; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
          isActive
            ? "bg-primary-subtle text-primary font-medium"
            : "text-body hover:bg-primary-subtle/50 hover:text-primary"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-border">
        <img src={logo} alt="CareerPath" className="h-14" />
      </div>
      <div className="flex flex-col flex-1 py-3">
        <nav className="px-3 space-y-0.5 flex-1">
          {navItems.map(({ to, Icon, label, end }) => (
            <NavLinkItem key={to} to={to} Icon={Icon} label={label} end={end} />
          ))}
        </nav>
        <div className="px-3 pt-3 border-t border-border mt-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-64 bg-surface border-r border-border min-h-screen flex-col shrink-0">
        {sidebarContent}
      </aside>

      <Sheet>
        <SheetTrigger className="fixed top-3 left-3 z-50 inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg bg-surface border border-border text-body shadow-sm hover:bg-primary-subtle transition-colors">
          <Menu size="18" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
