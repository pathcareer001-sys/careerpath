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
        border-slate-200
        rounded-2xl
        shadow-sm
        `,
        className,
      )}
    >
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
