import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { contactSchema, type ContactSchema } from "@/features/contact/schemas/contactSchema";
import { contactService } from "@/features/contact/services/contactService";
import { emailService } from "@/services/emailService";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    try {
      await contactService.submit(data);
      emailService.sendContactNotification(data.name, data.email, data.subject, data.message);
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-purple-700 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center relative z-10">
          <h1 className="text-5xl font-medium">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 -mt-8 relative z-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4">
            <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <Mail size="18" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500">pathcareer001@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white">
                  <Phone size="18" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Phone</p>
                  <p className="text-xs text-slate-500">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                  <MapPin size="18" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Location</p>
                  <p className="text-xs text-slate-500">Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-white border border-[#E2E8F0] p-6 animate-fade-in-up animate-delay-100"
          >
            <h2 className="text-base font-medium text-slate-900 mb-1">Send us a message</h2>
            <p className="text-sm text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <AppInput placeholder="Your name" {...register("name")} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <AppInput placeholder="Your email" {...register("email")} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <AppInput placeholder="Subject" {...register("subject")} />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="h-36 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFF] px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:outline-none focus:shadow-[0_0_0_3px_#EEF3FE] transition-colors resize-none"
                  {...register("message")}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <AppButton type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"} <Send size="15" />
              </AppButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
