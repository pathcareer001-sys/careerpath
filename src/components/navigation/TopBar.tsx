import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/constants/roles";

export default function TopBar() {
  const { user } = useAuth();

  const profilePath =
    user?.role === ROLES.COMPANY ? "/company/profile" : "/profile";

  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center px-6 gap-4 shadow-[inset_0_2px_0_0_#2563eb]">
      <div className="flex-1" />

      <button className="relative p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
        <Bell size="18" />
      </button>

      <Link
        to={profilePath}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <img
          src={user?.photoURL || "https://ui-avatars.com/api/?name=User&background=EEF3FE&color=2563EB&size=32"}
          alt=""
          className="w-7 h-7 rounded-full"
        />
        <span className="text-sm text-slate-700 hidden md:inline">{user?.name || "User"}</span>
      </Link>
    </header>
  );
}
