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
        text-red-500
        "
      />

      <p>{message || "Something went wrong"}</p>
    </div>
  );
}
