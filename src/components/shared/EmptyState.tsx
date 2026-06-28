import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="py-20 flex flex-col items-center text-center animate-fade-in">
      <div className="h-14 w-14 rounded-2xl bg-primary-subtle flex items-center justify-center ring-4 ring-primary-subtle/50">
        <Inbox size="24" className="text-primary/80" />
      </div>
      <h3 className="mt-5 text-sm font-semibold text-body">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-muted max-w-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}
