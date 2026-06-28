import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export default function AppTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm text-body placeholder:text-muted focus:border-primary focus:ring-3 focus:ring-primary-subtle transition-all resize-y min-h-[80px]",
        className,
      )}
      {...props}
    />
  );
}
