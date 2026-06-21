import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div
      className="
      flex
      justify-center
      py-12
      "
    >
      <Loader2
        size={24}
        className="
        animate-spin
        text-blue-600
        "
      />
    </div>
  );
}
