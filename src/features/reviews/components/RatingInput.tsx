import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingInput({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="
            transition-all
            duration-200
            hover:scale-125
            "
          >
            <Star
              size={32}
              className={
                star <= value
                  ? "fill-warning text-warning"
                  : "text-muted"
              }
            />
          </button>
        ))}
      </div>

      <span
        className="
        inline-flex
        rounded-full
        bg-warning/10
        px-3
        py-1
        text-sm
        font-medium
        text-warning
        "
      >
        {value}/5 Rating
      </span>
    </div>
  );
}
