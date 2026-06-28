import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
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
    lg: "px-6 py-3 text-[14px]",
  };

  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-button hover:shadow-button-hover hover:bg-primary-hover active:bg-primary-active active:scale-[0.98]",
    secondary:
      "bg-surface text-body border border-border hover:border-primary/30 hover:bg-primary-subtle hover:text-primary active:bg-primary-subtle/80",
    danger:
      "bg-error text-destructive-foreground shadow-button hover:shadow-md hover:bg-error/90 active:bg-error/80 active:scale-[0.98]",
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
