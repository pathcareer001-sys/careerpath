import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterSchema } from "../schemas/registerSchema";

import { authService } from "../services/authService";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { toast } from "sonner";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      role: "student",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      await authService.register(
        values.name,
        values.email,
        values.password,
        values.role,
      );

      toast.success("Account created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        <AppInput
          {...register("name")}
          placeholder="Nama"
          className="border p-2 w-full"
        />

        <p>{errors.name?.message}</p>

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

        <div className="space-y-1">
          <select
            {...register("role")}
            className="
    w-full
    h-11
    rounded-xl
    border
    border-slate-200
    px-3
    "
          >
            <option value="student">Student</option>

            <option value="company">Company</option>
          </select>

          <p className="text-sm text-red-500">{errors.role?.message}</p>
        </div>

        <AppButton
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </AppButton>
      </form>
    </div>
  );
}
