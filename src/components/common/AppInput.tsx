import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export default function AppInput({ className, type, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  const input = (
    <input
      type={isPassword && visible ? "text" : type}
      className={cn(
        "h-9 w-full rounded-lg border border-input bg-surface px-3 text-sm text-heading placeholder:text-muted focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-subtle transition-all",
        isPassword && "pr-10",
        className,
      )}
      {...props}
    />
  );

  if (isPassword) {
    return (
      <div className="relative">
        {input}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary-text hover:text-body transition-colors p-0.5"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    );
  }

  return input;
}
