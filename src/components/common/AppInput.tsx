import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export default function AppInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-border bg-[#F8FAFF] px-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#5FAED8] focus:outline-none focus:shadow-[0_0_0_3px_#D9F0FB] transition-colors",
        className,
      )}
      {...props}
    />
  );
}
