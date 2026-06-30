import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Masukkan email yang valid"),
    university: z.string().optional(),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Harap konfirmasi kata sandi Anda"),
    role: z.enum(["student", "company"]),
    agreed: z.literal(true, { message: "Anda harus menyetujui Syarat & Kebijakan Privasi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "student" && !data.university) return false;
      return true;
    },
    { message: "Universitas wajib diisi untuk mahasiswa", path: ["university"] },
  );

export type RegisterSchema = z.infer<typeof registerSchema>;
