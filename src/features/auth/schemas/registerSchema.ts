import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Please enter a valid email"),
    university: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    role: z.enum(["student", "company"]),
    agreed: z.literal(true, { message: "You must agree to the Terms & Privacy Policy" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "student" && !data.university) return false;
      return true;
    },
    { message: "University is required for students", path: ["university"] },
  );

export type RegisterSchema = z.infer<typeof registerSchema>;
