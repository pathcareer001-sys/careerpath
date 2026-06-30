import { AlertCircle } from "lucide-react";

export default function ErrorState({ message }: { message?: string }) {
  return (
    <div
      className="
      text-center
      py-12
      "
    >
      <AlertCircle
        size={40}
        className="
        mx-auto
        mb-3
        text-error
        "
      />

      <p>{message || "Terjadi kesalahan"}</p>
    </div>
  );
}
