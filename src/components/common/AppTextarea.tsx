import { cn } from "@/lib/utils";

import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function AppTextarea({ className, ...props }: Props) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-surface-alt px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none transition-colors resize-y min-h-[80px]",
        className,
      )}
      {...props}
    />
  );
}
