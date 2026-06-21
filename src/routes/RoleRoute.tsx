import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import type { Role } from "@/constants/roles";

interface Props {
  role: Role;
  children: React.ReactNode;
}

export default function RoleRoute({ role, children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
