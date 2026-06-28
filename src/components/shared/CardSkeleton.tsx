export default function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border-light bg-surface p-4">
      <div className="h-4 w-24 rounded-md bg-muted/30" />
      <div className="mt-4 h-4 w-full rounded-md bg-muted/30" />
      <div className="mt-2 h-4 w-3/4 rounded-md bg-muted/30" />
      <div className="mt-4 h-3 w-16 rounded-md bg-muted/30" />
    </div>
  );
}
