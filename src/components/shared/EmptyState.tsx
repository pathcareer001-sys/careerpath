import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div
      className="
      py-16
      flex
      flex-col
      items-center
      text-center
      "
    >
      <Inbox size={40} className="text-slate-400" />

      <h3 className="mt-4 font-semibold">{title}</h3>

      {description && <p className="text-slate-500 mt-2">{description}</p>}
    </div>
  );
}
