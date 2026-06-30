import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Alamat email tidak valid"),
  subject: z.string().min(1, "Subjek wajib diisi"),
  message: z.string().min(10, "Pesan harus terdiri dari minimal 10 karakter"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
