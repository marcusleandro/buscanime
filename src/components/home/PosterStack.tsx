import { cn } from "@/lib/utils";
import { FEATURED_ANIMES } from "./featured-animes";

const POSTER_POSITIONS = [
  "left-[0%] z-10",
  "left-[28%] z-20",
  "left-[56%] z-30",
] as const;

export const PosterStack = () => {
  return (
    <div className="relative mx-auto h-[280px] w-full max-w-[320px] sm:h-[340px] sm:max-w-[380px] lg:mx-0 lg:ml-auto lg:h-[420px] lg:max-w-[440px]">
      {FEATURED_ANIMES.map((anime, index) => (
        <figure
          key={anime.title}
          className={cn(
            "group absolute top-1/2 w-[42%] -translate-y-1/2",
            POSTER_POSITIONS[index]
          )}
        >
          <div style={{ transform: `rotate(${anime.rotate}deg)` }}>
            <div
              className={cn(
                "overflow-hidden rounded-lg shadow-lg ring-1 ring-foreground/10",
                "transition-transform duration-300 motion-reduce:transition-none",
                "group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0"
              )}
            >
              <div className="relative aspect-2/3">
                <img
                  src={anime.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  loading="eager"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-b from-black/85 to-black/17"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3">
                  <span className="font-heading text-sm font-bold text-white sm:text-base">
                    {anime.title}
                  </span>
                </figcaption>
              </div>
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
};

export default PosterStack;
