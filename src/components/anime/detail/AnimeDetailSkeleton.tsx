import { Card, Skeleton } from "@/components";

export const AnimeDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-10">
      <Card className="overflow-hidden rounded-xl p-0">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:gap-8 sm:p-8">
          <Skeleton className="mx-auto aspect-2/3 w-44 shrink-0 rounded-lg sm:mx-0 sm:w-52 lg:w-56" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-10 w-3/4 max-w-md" />
            <Skeleton className="h-6 w-1/2 max-w-xs" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>
            <Skeleton className="h-4 w-full max-w-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-14 rounded" />
            </div>
          </div>
        </div>
      </Card>

      <div>
        <Skeleton className="mb-4 h-8 w-32" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>

      <div>
        <Skeleton className="mb-4 h-8 w-36" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="aspect-video rounded-lg" />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-317/270 w-[200px] shrink-0 rounded-lg sm:w-[220px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailSkeleton;
