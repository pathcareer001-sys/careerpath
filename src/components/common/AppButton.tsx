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
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-blue-600 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 active:bg-blue-100",
    danger:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 active:from-red-700 active:to-rose-800 shadow-sm hover:shadow-md",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13.5px] font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
