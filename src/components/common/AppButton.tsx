import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "default" | "sm" | "lg";
}

export default function AppButton({
  children,
  className,
  variant = "primary",
  size = "default",
  ...props
}: Props) {
  const sizeStyles = {
    default: "px-5 py-2.5 text-[13.5px]",
    sm: "px-3.5 py-2 text-[12.5px]",
    lg: "px-6 py-3 text-[15px]",
  };

  const variants = {
    primary:
      "bg-primary text-white shadow-button hover:shadow-button-hover hover:bg-primary-hover hover:-translate-y-0.5 active:bg-primary-active active:translate-y-0 active:scale-[0.97]",
    secondary:
      "bg-surface text-body border border-border hover:border-primary/30 hover:bg-primary-subtle hover:text-primary active:bg-primary-subtle/80",
    danger:
      "bg-error text-white shadow-sm hover:shadow-md hover:bg-error/90 hover:-translate-y-0.5 active:bg-error/80 active:translate-y-0 active:scale-[0.97]",
    outline:
      "bg-transparent text-secondary-text border border-border/60 hover:border-border hover:text-body hover:bg-surface active:bg-surface-alt",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none ${sizeStyles[size]} ${variants[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
