import { Button } from "@/components/ui/button";

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
    primary: `
      bg-gradient-to-r
      from-blue-600
      to-blue-500
      text-white
      hover:opacity-90
    `,

    secondary: `
      bg-white
      text-blue-600
      border
      border-slate-200
      hover:bg-slate-50
    `,

    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
    `,
  };

  return (
    <Button
      className={`
        h-12
        rounded-xl
        font-medium

        ${variants[variant]}

        ${className || ""}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}
