import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AppInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={cn(
        `
        h-11
        rounded-xl
        border-slate-300
        focus-visible:ring-blue-500
        `,
        props.className,
      )}
    />
  );
}
