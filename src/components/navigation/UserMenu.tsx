import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/constants/roles";

export default function UserMenu() {
  const { user } = useAuth();

  const profilePath =
    user?.role === ROLES.COMPANY ? "/company/profile" : "/profile";

  return (
    <Link
      to={profilePath}
      className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-primary-subtle/50 transition-colors"
    >
      <img
        src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=EBF3FA&color=4682B4&size=40`}
        alt="Profil"
        className="w-8 h-8 rounded-full ring-2 ring-primary/15 md:w-10 md:h-10"
      />

      <div className="hidden md:block">
        <p className="text-sm font-medium">{user?.name || "Pengguna"}</p>
        <p className="text-xs text-secondary-text">{user?.email}</p>
      </div>
    </Link>
  );
}
