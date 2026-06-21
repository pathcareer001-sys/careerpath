import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

export default function AppCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        `
        bg-white
        border
        border-slate-100
        rounded-3xl
        shadow-lg
        shadow-slate-200/40
        transition-all
        duration-300
        hover:shadow-2xl
        hover:shadow-slate-200/60
        hover:-translate-y-1
        `,
        className,
      )}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}