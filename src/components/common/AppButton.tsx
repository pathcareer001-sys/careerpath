import { Button } from "@/components/ui/button";

import type {
  ButtonHTMLAttributes,
} from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AppButton({
  children,
  className,
  ...props
}: Props) {
  return (
    <Button
      className={`
      bg-blue-600
      hover:bg-blue-700
      text-white
      rounded-xl
      ${className || ""}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}