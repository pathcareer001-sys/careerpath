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
    } catch {
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="w-full max-w-sm animate-fade-in-up">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <img src={logo} alt="CareerPath" className="h-8 mb-5" />

        <h1 className="text-[22px] font-medium text-slate-900">Reset password</h1>
        <p className="mt-1 text-sm text-slate-500">Enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit(handleReset)} className="mt-6 space-y-4">
          <div>
            <AppInput {...register("email")} placeholder="Email" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send reset link"}
          </AppButton>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
