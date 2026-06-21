import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),

  email: z.email("Email tidak valid"),

  password: z.string().min(6, "Password minimal 6 karakter"),

  role: z.enum(["student", "company"]),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
