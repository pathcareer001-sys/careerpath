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

      toast.error("Peran tidak ditemukan");
    } catch {
      toast.error("Email atau kata sandi tidak valid");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error?.code === "auth/popup-blocked") {
        toast.error("Popup Google diblokir. Izinkan popup atau coba metode lain.");
      } else if (error?.code === "auth/popup-closed-by-user") {
        toast.error("Login Google dibatalkan.");
      } else {
        toast.error("Gagal login dengan Google. Coba lagi.");
      }
    }
  };

  return (
    <div className="w-full max-w-sm animate-spring-up">
      <SEO title="Masuk" description="Masuk ke akun CareerPath untuk melanjutkan." />
      <div className="bg-surface border border-border-light rounded-xl p-6 shadow-card">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-[22px] font-semibold tracking-tight text-heading">Masuk</h1>
        <p className="mt-1 text-sm text-secondary-text leading-relaxed">Masukkan kredensial akun Anda</p>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-4">
          <div>
            <AppInput {...register("email")} placeholder="Email" />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>
          <div>
            <AppInput type="password" {...register("password")} placeholder="Kata Sandi" />
            {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-body cursor-pointer">
              <input type="checkbox" className="rounded border-border text-primary focus:ring-primary focus:ring-2" />
              Ingat saya
            </label>
            <Link to="/forgot-password" className="text-primary text-sm font-medium hover:text-primary-hover transition-colors">Lupa password?</Link>
          </div>

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Memasuki..." : "Masuk"}
          </AppButton>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-divider" />
          <span className="text-xs text-muted">atau</span>
          <div className="h-px flex-1 bg-divider" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 flex items-center justify-center gap-2 text-sm text-body hover:border-primary/30 hover:bg-primary-subtle transition-all duration-200"
        >
          <FcGoogle size="18" />
          Lanjutkan dengan Google
        </button>

        <p className="mt-5 text-center text-sm text-secondary-text">
          Belum punya akun?{" "}
          <Link to="/register" className="text-primary font-semibold hover:text-primary-hover transition-colors">Buat akun</Link>
        </p>
      </div>
    </div>
  );
}
