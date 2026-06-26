import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import logo from "@/assets/images/logo.png";
import { authService } from "../services/authService";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "../schemas/forgotPasswordSchema";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleReset = async (data: ForgotPasswordSchema) => {
    try {
      await authService.resetPassword(data.email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-blue-100 bg-white p-8 shadow-sm shadow-blue-100/60">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-4xl font-bold">Reset Password</h1>

        <p className="mt-2 text-slate-500">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit(handleReset)} className="mt-8">
          <div>
            <AppInput
              {...register("email")}
              placeholder="Enter your email"
              className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <AppButton
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </AppButton>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
