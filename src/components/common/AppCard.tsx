import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export default function AppCard({ children, className, hover = true, ...props }: Props) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-xl transition-all duration-300",
        hover && "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5 hover:border-primary",
        className,
      )}
      {...props}
    >
      <div className="p-4">{children}</div>
    </div>
  );
}
