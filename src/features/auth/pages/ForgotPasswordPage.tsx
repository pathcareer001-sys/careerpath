import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import SEO from "@/components/seo/SEO";
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
      <SEO title="Lupa Password" description="Reset password akun CareerPath Anda." noIndex />
      <div className="bg-surface border border-border rounded-xl p-6">
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1 className="text-[22px] font-medium text-heading">Reset password</h1>
        <p className="mt-1 text-sm text-secondary-text">Enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit(handleReset)} className="mt-6 space-y-4">
          <div>
            <AppInput {...register("email")} placeholder="Email" />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>

          <AppButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send reset link"}
          </AppButton>
        </form>

        <p className="mt-5 text-center text-sm text-secondary-text">
          Remember your password?{" "}
          <Link to="/login" className="text-primary font-medium hover:text-primary transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
