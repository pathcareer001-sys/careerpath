import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export default function AppInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFF] px-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:outline-none focus:shadow-[0_0_0_3px_#EEF3FE] transition-colors",
        className,
      )}
      {...props}
    />
  );
}
