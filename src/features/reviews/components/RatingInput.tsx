import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

import AppButton from "@/components/common/AppButton";

export default function RatingInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-1">

      {[1, 2, 3, 4, 5].map(
        (star) => (
          <AppButton
            key={star}
            type="button"
            onClick={() =>
              onChange(star)
            }
          >
            <Star
              size={24}
              className={
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </AppButton>
        )
      )}

    </div>
  );
}