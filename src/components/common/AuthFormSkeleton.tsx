import { Skeleton } from "@/components/ui/skeleton";

export default function AuthFormSkeleton() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-blue-100 bg-white p-8 shadow-sm shadow-blue-100/60">
        <Skeleton className="h-12 w-32 mb-6" />
        <Skeleton className="h-9 w-40 mb-2" />
        <Skeleton className="h-5 w-56 mb-8" />

        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        <Skeleton className="h-4 w-32 mt-4" />
        <Skeleton className="h-12 w-full rounded-xl mt-6" />

        <div className="my-6 flex items-center gap-4">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-px flex-1" />
        </div>

        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-5 w-56 mx-auto mt-6" />
      </div>
    </div>
  );
}
