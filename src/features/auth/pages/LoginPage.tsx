import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginSchema,
} from "../schemas/loginSchema";

import { authService } from "../services/authService";

import { useNavigate } from "react-router-dom";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    values: LoginSchema
  ) => {
    try {
      await authService.login(
        values.email,
        values.password
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
        await authService.loginWithGoogle();

        navigate("/dashboard");
    } catch (error: any) {

        if (
        error.code ===
        "auth/popup-closed-by-user"
        ) {
        return;
        }

        if (
        error.code ===
        "auth/cancelled-popup-request"
        ) {
        return;
        }

        console.error(error);
    }
    };

  return (
    <div className="max-w-md mx-auto mt-20">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <AppInput
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full"
        />

        <p>{errors.email?.message}</p>

        <AppInput
          {...register("password")}
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
        />

        <p>{errors.password?.message}</p>

        <AppButton
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </AppButton>

        <AppButton
        type="button"
        onClick={handleGoogleLogin}
        >
        Login dengan Google
        </AppButton>
      </form>

    </div>
  );
}