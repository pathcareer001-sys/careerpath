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
      "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-hover hover:to-primary-hover active:from-primary-active active:to-primary-active shadow-sm hover:shadow-md",
    secondary:
      "bg-surface text-primary border border-border hover:bg-accent hover:border-primary active:bg-section",
    danger:
      "bg-gradient-to-r from-error to-error/80 text-white hover:from-error/90 hover:to-error/70 active:from-error/80 active:to-error/60 shadow-sm hover:shadow-md",
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
