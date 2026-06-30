import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <Loader2 size="26" className="animate-spin text-primary/70" />
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/5" style={{ animationDuration: "2s" }} />
      </div>
      <p className="text-sm text-secondary-text font-medium">Memuat data...</p>
    </div>
  );
}
