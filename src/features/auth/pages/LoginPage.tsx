import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import logo from "@/assets/images/logo.png";
import { authService } from "../services/authService";
import { userService } from "@/features/users/services/userService";
import { loginSchema, type LoginSchema } from "../schemas/loginSchema";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const credential = await authService.login(data.email, data.password);
      const appUser = await userService.getUser(credential.user.uid);

      if (appUser?.role === "student") { navigate("/dashboard"); return; }
      if (appUser?.role === "company") { navigate("/company"); return; }
      if (appUser?.role === "admin") { navigate("/admin"); return; }
      if (appUser?.role === "staff") { navigate("/staff"); return; }

      toast.error("Role not found");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const credential = await authService.loginWithGoogle();
      const appUser = await userService.getUser(credential.user.uid);

      if (appUser?.role === "student") { navigate("/dashboard"); return; }
      if (appUser?.role === "company") { navigate("/company"); return; }
      if (appUser?.role === "admin") { navigate("/admin"); return; }
      if (appUser?.role === "staff") { navigate("/staff"); return; }
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-sm animate-fade-in-up">
      <div className="bg-surface border border-border rounded-xl p-6 border-border/30">
        <img src={logo} alt="CareerPath" className="h-8 mb-5" />

        <h1 className="text-[22px] font-medium text-heading">Sign in</h1>
        <p className="mt-1 text-sm text-secondary-text">Enter your account credentials</p>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-4">
          <div>
            <AppInput {...register("email")} placeholder="Email" />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>
          <div>
            <AppInput type="password" {...register("password")} placeholder="Password" />
            {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary text-sm font-medium hover:text-primary transition-colors">Forgot password?</Link>
          </div>

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </AppButton>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-muted">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-border py-2 flex items-center justify-center gap-2 text-sm text-body hover:bg-accent hover:border-primary transition-all duration-200"
        >
          <FcGoogle size="18" />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-secondary-text">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:text-primary transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  );
}
