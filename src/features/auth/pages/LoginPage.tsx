import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import SEO from "@/components/seo/SEO";
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

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className="w-full max-w-sm animate-spring-up">
      <SEO title="Masuk" description="Masuk ke akun CareerPath untuk melanjutkan." />
      <div className="bg-surface border border-border-light rounded-xl p-6 shadow-card">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-[22px] font-semibold tracking-tight text-heading">Sign in</h1>
        <p className="mt-1 text-sm text-secondary-text leading-relaxed">Enter your account credentials</p>

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
            <label className="flex items-center gap-2 text-body cursor-pointer">
              <input type="checkbox" className="rounded border-border text-primary focus:ring-primary focus:ring-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary text-sm font-medium hover:text-primary-hover transition-colors">Forgot password?</Link>
          </div>

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </AppButton>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-divider" />
          <span className="text-xs text-muted">or</span>
          <div className="h-px flex-1 bg-divider" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 flex items-center justify-center gap-2 text-sm text-body hover:border-primary/30 hover:bg-primary-subtle transition-all duration-200"
        >
          <FcGoogle size="18" />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-secondary-text">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:text-primary-hover transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  );
}
