import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: "default" | "sm" | "lg" | "none";
}

export default function AppCard({ children, className, hover = true, padding = "default", ...props }: Props) {
  return (
    <div
      className={cn(
        "bg-surface border border-border-light/65 rounded-xl shadow-card transition-all duration-300",
        padding === "default" && "p-5",
        padding === "sm" && "p-4",
        padding === "lg" && "p-6",
        padding === "none" && "p-0",
        hover && "hover:shadow-card-hover hover:border-border-light",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
