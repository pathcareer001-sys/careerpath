import { cn } from "@/lib/utils";

import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function AppInput({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-slate-200 bg-surface-alt px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none transition-colors",
        className,
      )}
      {...props}
    />
  );
}
