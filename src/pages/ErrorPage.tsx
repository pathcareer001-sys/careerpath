import { Link, useRouteError } from "react-router-dom";

import AppButton from "@/components/common/AppButton";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center">
      <div className="text-center animate-fade-in-up max-w-md mx-auto px-6">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-medium shadow-sm mb-6">
          404
        </div>
        <h1 className="text-3xl font-medium text-slate-900">Page Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <AppButton>Back to Home</AppButton>
        </Link>
      </div>
    </div>
  );
}
