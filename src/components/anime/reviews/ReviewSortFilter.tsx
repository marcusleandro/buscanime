import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  REVIEW_SORT_LABELS,
  REVIEW_SORTS,
  isAnimeReviewSort,
  type AnimeReviewSort,
} from "@/types/anime/reviewSort";

interface ReviewSortFilterProps {
  value: AnimeReviewSort;
  onChange: (sort: AnimeReviewSort) => void;
}

const filterItemClassName = cn(
  "h-8 min-h-8 shrink-0 rounded border border-primary bg-background px-5 text-sm font-semibold text-primary shadow-none transition-colors",
  "data-[state=off]:hover:border-primary data-[state=off]:hover:bg-primary/10 data-[state=off]:hover:text-primary",
  "data-[state=off]:active:bg-primary/15",
  "data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
  "data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground",
  "data-[state=on]:active:bg-primary",
  "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0"
);

/** Single-select toggle group for sorting anime reviews. */
export const ReviewSortFilter = ({
  value,
  onChange,
}: ReviewSortFilterProps) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(next) => {
        if (isAnimeReviewSort(next)) onChange(next);
      }}
      aria-label="Ordenar reviews"
      className="flex w-full max-w-full flex-wrap justify-start gap-3"
    >
      {REVIEW_SORTS.map((sort) => (
        <ToggleGroupItem
          key={sort}
          value={sort}
          className={filterItemClassName}
        >
          {REVIEW_SORT_LABELS[sort]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ReviewSortFilter;
