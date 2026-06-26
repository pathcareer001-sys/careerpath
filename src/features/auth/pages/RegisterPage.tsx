import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";
import logo from "@/assets/images/logo.png";
import { authService } from "../services/authService";
import { registerSchema, type RegisterSchema } from "../schemas/registerSchema";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student", agreed: false as unknown as true },
  });

  const handleRegister = async (data: RegisterSchema) => {
    try {
      await authService.register(data.name, data.email, data.password, data.role);
      navigate(data.role === "company" ? "/company" : "/dashboard");
    } catch {
      toast.error("Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await authService.loginWithGoogle();
      navigate("/dashboard");
    } catch {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <img src={logo} alt="CareerPath" className="h-8 mb-5" />

        <h1 className="text-[22px] font-medium text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Join thousands of students finding opportunities.</p>

        <form onSubmit={handleSubmit(handleRegister)} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Register as</label>
            <select
              {...register("role")}
              className="h-9 w-full rounded-lg border border-slate-200 bg-surface-alt px-3 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AppInput {...register("name")} placeholder="Full name" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <AppInput {...register("email")} placeholder="Email" />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <AppInput {...register("university")} placeholder="University" />
            </div>
            <div>
              <AppInput type="password" {...register("password")} placeholder="Password" />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div>
              <AppInput type="password" {...register("confirmPassword")} placeholder="Confirm password" />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" {...register("agreed")} className="accent-blue-600" />
            I agree to the Terms & Privacy Policy
          </label>
          {errors.agreed && <p className="text-xs text-red-500">{errors.agreed.message}</p>}

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Create account"}
          </AppButton>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full rounded-lg border border-slate-200 py-2 flex items-center justify-center gap-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <FcGoogle size="18" />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
