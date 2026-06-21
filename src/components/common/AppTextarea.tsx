import { Textarea }
from "@/components/ui/textarea";

export default function AppTextarea(
  props: React.ComponentProps<
    typeof Textarea
  >
) {
  return (
    <Textarea
      className="
      rounded-2xl
      min-h-[120px]
      "
      {...props}
    />
  );
}