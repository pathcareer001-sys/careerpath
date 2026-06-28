export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-section p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-6 w-48 bg-section rounded animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-surface border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
