import { Link } from "react-router-dom";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FEATURED_ANIMES } from "./featured-animes";

export const FeaturedClassics = () => {
  return (
    <section className="mt-16">
      <h2 className="mb-6 font-heading text-2xl font-bold">
        Clássicos em destaque
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURED_ANIMES.map((anime) => (
          <Link
            key={anime.title}
            to={`/animes?search=${encodeURIComponent(anime.searchQuery)}`}
            className={cn(
              "group rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            )}
          >
            <Card className="relative aspect-317/270 gap-0 overflow-hidden rounded-lg p-0 transition-shadow group-hover:shadow-lg group-focus-visible:shadow-lg">
              <img
                src={anime.image}
                alt={anime.alt}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-b from-black/85 to-black/17"
              />
              <div className="relative flex h-full flex-col justify-end p-5">
                <CardTitle className="text-xl font-bold text-white">
                  {anime.title}
                </CardTitle>
                <span className="mt-1 text-sm text-white/80">Ver na lista</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClassics;
