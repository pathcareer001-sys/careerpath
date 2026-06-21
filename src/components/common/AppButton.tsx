import { Button } from "@/components/ui/button";

import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AppButton({ children, className, ...props }: Props) {
  return (
    <Button
      className={`
      rounded-xl
      h-12
      font-medium
      bg-gradient-to-r
      from-blue-600
      to-blue-500
      ${className || ""}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}
