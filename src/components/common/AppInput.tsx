import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export default function AppInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-input bg-surface px-3 text-sm text-heading placeholder:text-muted focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary-subtle transition-all",
        className,
      )}
      {...props}
    />
  );
}
