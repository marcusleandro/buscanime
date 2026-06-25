import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  ANIME_FORMATS,
  FORMAT_LABELS,
  isAnimeFormat,
  type AnimeFormat,
} from "@/types/anime/formats";

interface FormatFilterProps {
  value: AnimeFormat;
  onChange: (format: AnimeFormat) => void;
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

/** Single-select toggle group for filtering the anime list by media format. */
export const FormatFilter = ({ value, onChange }: FormatFilterProps) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(next) => {
        if (isAnimeFormat(next)) onChange(next);
      }}
      aria-label="Filtrar por formato"
      className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-[19px]"
    >
      {ANIME_FORMATS.map((format) => (
        <ToggleGroupItem
          key={format}
          value={format}
          className={filterItemClassName}
        >
          {FORMAT_LABELS[format]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FormatFilter;
