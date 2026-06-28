import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export default function AppTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-body placeholder:text-muted focus:border-blue-600 focus:outline-none transition-colors resize-y min-h-[80px]",
        className,
      )}
      {...props}
    />
  );
}
