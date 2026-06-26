import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function AppCard({ children, className, ...props }: Props) {
  return (
    <Card
      className={cn(
        "bg-white border border-blue-100 rounded-lg shadow-sm shadow-blue-100/60 transition-all duration-300 hover:shadow-md hover:shadow-blue-100/80",
        className,
      )}
      {...props}
    >
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
