export default function CardSkeleton() {
  return (
    <div
      className="
      animate-pulse
      rounded-2xl
      border
      bg-white
      p-6
      "
    >
      <div className="h-5 w-40 rounded bg-slate-200" />

      <div className="mt-4 h-4 w-full rounded bg-slate-200" />

      <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />

      <div className="mt-6 h-4 w-20 rounded bg-slate-200" />
    </div>
  );
}
