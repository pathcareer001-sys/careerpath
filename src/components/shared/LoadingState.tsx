import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 size="24" className="animate-spin text-primary" />
      <p className="text-sm text-secondary-text">Loading data...</p>
    </div>
  );
}
