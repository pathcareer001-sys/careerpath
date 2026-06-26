import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
        <Inbox size="22" className="text-slate-400" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-slate-700">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
}
