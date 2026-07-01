import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import SEO from "@/components/seo/SEO";
import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";
import logo from "@/assets/images/logo.png";
import { auth } from "@/firebase/auth";
import { userService } from "@/features/users/services/userService";
import { authService } from "../services/authService";
import { registerSchema, type RegisterSchema } from "../schemas/registerSchema";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student", agreed: false as unknown as true },
  });

  const selectedRole = useWatch({ control, name: "role" });

  const handleRegister = async (data: RegisterSchema) => {
    try {
      await authService.register(data.name, data.email, data.password, data.role);
      navigate(data.role === "company" ? "/company" : "/dashboard");
    } catch {
      toast.error("Pendaftaran gagal");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await authService.loginWithGoogle();
      if (!auth.currentUser) return;
      const appUser = await userService.getUser(auth.currentUser.uid);
      if (!appUser) return;
      if (appUser.role === "student") { navigate("/dashboard"); return; }
      if (appUser.role === "company") { navigate("/company"); return; }
      if (appUser.role === "admin") { navigate("/admin"); return; }
      if (appUser.role === "staff") { navigate("/staff"); return; }
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error("[Google Register Error]", error?.code, error?.message, error);
      if (error?.code === "auth/popup-blocked") {
        toast.error("Popup Google diblokir. Izinkan popup atau coba metode lain.");
      } else if (error?.code === "auth/popup-closed-by-user") {
        toast.error("Pendaftaran Google dibatalkan.");
      } else {
        toast.error("Gagal daftar dengan Google. Coba lagi.");
      }
    }
  };

  return (
    <div className="w-full max-w-lg animate-spring-up">
      <SEO title="Daftar" description="Buat akun CareerPath dan temukan magang impianmu." />
      <div className="bg-surface border border-border-light rounded-xl p-6 shadow-card">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-[22px] font-semibold tracking-tight text-heading">Buat Akun</h1>
        <p className="mt-1 text-sm text-secondary-text leading-relaxed">Bergabunglah dengan ribuan mahasiswa yang mencari peluang.</p>

        <form onSubmit={handleSubmit(handleRegister)} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-body mb-1.5">Daftar sebagai</label>
            <select
              {...register("role")}
              className="h-9 w-full rounded-lg border border-input bg-surface px-3 text-sm text-heading focus:border-primary focus:ring-3 focus:ring-primary-subtle transition-all outline-none"
            >
              <option value="student">Mahasiswa</option>
              <option value="company">Perusahaan</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <AppInput
                {...register("name")}
                placeholder={selectedRole === "company" ? "Nama perusahaan" : "Nama lengkap"}
              />
              {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <AppInput {...register("email")} placeholder="Email" />
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
            </div>
            {selectedRole === "student" && (
              <div className="sm:col-span-2">
                <AppInput {...register("university")} placeholder="Universitas" />
                {errors.university && <p className="mt-1 text-xs text-error">{errors.university.message}</p>}
              </div>
            )}
            <div>
              <AppInput type="password" {...register("password")} placeholder="Kata Sandi" />
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
            </div>
            <div>
              <AppInput type="password" {...register("confirmPassword")} placeholder="Konfirmasi kata sandi" />
              {errors.confirmPassword && <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-body cursor-pointer">
            <input type="checkbox" {...register("agreed")} className="rounded border-border text-primary focus:ring-primary focus:ring-2" />
            Saya setuju dengan Syarat & Kebijakan Privasi
          </label>
          {errors.agreed && <p className="text-xs text-error">{errors.agreed.message}</p>}

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Membuat..." : "Buat Akun"}
          </AppButton>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-divider" />
          <span className="text-xs text-muted">atau</span>
          <div className="h-px flex-1 bg-divider" />
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 flex items-center justify-center gap-2 text-sm text-body hover:border-primary/30 hover:bg-primary-subtle transition-all duration-200"
        >
          <FcGoogle size="18" />
          Lanjutkan dengan Google
        </button>

        <p className="mt-5 text-center text-sm text-secondary-text">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary font-semibold hover:text-primary-hover transition-colors">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
