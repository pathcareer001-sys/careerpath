import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export default function AppInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-heading placeholder:text-muted focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent)] transition-colors",
        className,
      )}
      {...props}
    />
  );
}
