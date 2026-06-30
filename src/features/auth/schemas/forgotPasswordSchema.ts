import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Masukkan email yang valid"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
