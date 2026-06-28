export default function AuthFormSkeleton() {
  return (
    <div className="w-full max-w-sm">
      <div className="border border-border rounded-xl bg-surface p-6">
        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse mb-5" />
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="space-y-3">
          <div className="h-9 w-full bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-9 w-full bg-slate-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-9 w-full bg-slate-200 rounded-lg animate-pulse mt-4" />
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="h-3 w-6 bg-slate-200 rounded animate-pulse" />
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="h-9 w-full bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-40 bg-slate-200 rounded animate-pulse mx-auto mt-5" />
      </div>
    </div>
  );
}
