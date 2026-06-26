import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function AppButton({
  children,
  className,
  variant = "primary",
  ...props
}: Props) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary:
      "bg-white text-blue-600 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 active:bg-blue-100",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13.5px] font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
