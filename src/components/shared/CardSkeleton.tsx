export default function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-surface p-4">
      <div className="h-4 w-24 rounded bg-section" />
      <div className="mt-4 h-4 w-full rounded bg-section" />
      <div className="mt-2 h-4 w-3/4 rounded bg-section" />
      <div className="mt-4 h-3 w-16 rounded bg-section" />
    </div>
  );
}
