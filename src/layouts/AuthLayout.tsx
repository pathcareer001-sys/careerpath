import { Outlet } from "react-router-dom";

import AuthHero from "@/features/auth/components/AuthHero";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <AuthHero />

      <div className="flex items-center justify-center bg-blue-50/40 p-6">
        <Outlet />
      </div>
    </div>
  );
}
