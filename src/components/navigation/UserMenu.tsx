import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user } = useAuth();

  return (
    <Link
      to="/profile"
      className="
      flex
      items-center
      gap-3
      rounded-xl
      px-2
      py-2
      hover:bg-slate-100
      transition-colors
      "
    >
      <img
        src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
        alt="Profile"
        className="
        w-10
        h-10
        rounded-full
        "
      />

      <div>
        <p className="text-sm font-medium">{user?.displayName || "User"}</p>

        <p className="text-xs text-slate-500">{user?.email}</p>
      </div>
    </Link>
  );
}
