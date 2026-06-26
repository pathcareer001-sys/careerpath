import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function AppCard({ children, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-xl",
        className,
      )}
      {...props}
    >
      <div className="p-4">{children}</div>
    </div>
  );
}
