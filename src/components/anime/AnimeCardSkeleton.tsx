import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ANIME_GRID_CLASS,
  ANIME_GRID_SKELETON_COUNT,
} from "@/types/anime/formats";

export const AnimeCardSkeleton = () => {
  return (
    <Card className="relative aspect-317/270 gap-0 overflow-hidden rounded-lg p-0">
      <Skeleton className="absolute inset-0 size-full rounded-none" />
      <div className="relative flex h-full flex-col p-7 pt-6">
        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-7 w-4/5" />
          <div className="flex gap-[11px]">
            <Skeleton className="h-5 w-14 rounded" />
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
      </div>
      <div className="absolute right-2 bottom-2">
        <Skeleton className="h-8 w-16 rounded" />
      </div>
    </Card>
  );
};

interface AnimeGridSkeletonProps {
  count?: number;
}

export const AnimeGridSkeleton = ({
  count = ANIME_GRID_SKELETON_COUNT,
}: AnimeGridSkeletonProps) => {
  return (
    <div className={ANIME_GRID_CLASS}>
      {Array.from({ length: count }).map((_, index) => (
        <AnimeCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default AnimeCardSkeleton;
