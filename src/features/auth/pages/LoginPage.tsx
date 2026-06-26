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

      if (appUser?.role === "student") {
        navigate("/dashboard");
        return;
      }

      if (appUser?.role === "company") {
        navigate("/company");
        return;
      }

      if (appUser?.role === "admin") {
        navigate("/admin");
        return;
      }

      toast.error("Role not found");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const credential = await authService.loginWithGoogle();

      const appUser = await userService.getUser(credential.user.uid);

      if (appUser?.role === "student") {
        navigate("/dashboard");
        return;
      }

      if (appUser?.role === "company") {
        navigate("/company");
        return;
      }

      if (appUser?.role === "admin") {
        navigate("/admin");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-blue-100 bg-white p-8 shadow-sm shadow-blue-100/60">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-4xl font-bold">Sign In</h1>

        <p className="mt-2 text-slate-500">
          Enter your account credentials
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-4">
          <div>
            <AppInput
              {...register("email")}
              placeholder="Enter your email"
              className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <AppInput
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="rounded-xl h-12 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-blue-600">
              Forgot Password?
            </Link>
          </div>

          <AppButton
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full"
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </AppButton>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-200 py-3 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all duration-200"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
