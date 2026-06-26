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
    defaultValues: {
      role: "student",
      agreed: false as unknown as true,
    },
  });

  const handleRegister = async (data: RegisterSchema) => {
    try {
      await authService.register(data.name, data.email, data.password, data.role);

      if (data.role === "student") {
        navigate("/dashboard");
      }

      if (data.role === "company") {
        navigate("/company");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await authService.loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div className="rounded-lg border border-blue-100 bg-white p-8 shadow-sm shadow-blue-100/60">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-4xl font-bold">Create Account</h1>

        <p className="mt-2 text-slate-500">
          Join thousands of students finding internship opportunities.
        </p>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Register As</label>
            <select
              {...register("role")}
              className="h-12 w-full rounded-xl border border-slate-200 px-3 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <AppInput
                {...register("name")}
                placeholder="Full Name"
                className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <AppInput
                {...register("email")}
                placeholder="Email Address"
                className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <AppInput
                {...register("university")}
                placeholder="University"
                className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {errors.university && (
                <p className="mt-1 text-sm text-red-500">{errors.university.message}</p>
              )}
            </div>

            <div>
              <AppInput
                type="password"
                {...register("password")}
                placeholder="Password"
                className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <AppInput
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                {...register("agreed")}
                className="accent-blue-600"
              />
              I agree to the Terms & Privacy Policy
            </label>
            {errors.agreed && (
              <p className="mt-1 text-sm text-red-500">{errors.agreed.message}</p>
            )}
          </div>

          <AppButton
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </AppButton>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-200 py-3 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all duration-200"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
