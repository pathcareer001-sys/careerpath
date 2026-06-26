import { Outlet } from "react-router-dom";

import AuthHero from "@/features/auth/components/AuthHero";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 grid lg:grid-cols-2">
      <AuthHero />

      <div className="flex items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}
