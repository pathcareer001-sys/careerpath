import { Inbox } from "lucide-react";

interface Props {
  title: string;

  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div
      className="
      py-20
      flex
      flex-col
      items-center
      text-center
      "
    >
      <div
        className="
        h-16
        w-16
        rounded-full
        bg-slate-100
        flex
        items-center
        justify-center
        "
      >
        <Inbox size={28} className="text-slate-400" />
      </div>

      <h3
        className="
        mt-5
        text-lg
        font-semibold
        "
      >
        {title}
      </h3>

      {description && (
        <p
          className="
          mt-2
          max-w-md
          text-sm
          text-slate-500
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}
