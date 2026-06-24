import { AnimeCard } from "@/components/anime/AnimeCard";
import type { AnimeDetail, AnimeMedia, AnimeRelationEdge } from "@/services/anime";
import { ANIME_GRID_CLASS } from "@/types/anime/formats";

interface AnimeRelatedSectionProps {
  relations: AnimeDetail["relations"];
}

const toAnimeMedia = (
  node: NonNullable<NonNullable<AnimeRelationEdge>["node"]>
): AnimeMedia => ({
  id: node.id,
  title: node.title,
  coverImage: node.coverImage,
  format: node.format,
  averageScore: node.averageScore,
  genres: node.genres ?? null,
});

export const AnimeRelatedSection = ({
  relations,
}: AnimeRelatedSectionProps) => {
  const relatedAnimes =
    relations?.edges
      ?.filter(
        (edge): edge is NonNullable<AnimeRelationEdge> =>
          edge != null && edge.node?.type === "ANIME" && edge.node.id != null
      )
      .map((edge) => toAnimeMedia(edge.node!)) ?? [];

  if (relatedAnimes.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="mb-4 font-heading text-2xl font-bold">
        Animes relacionados
      </h2>
      <div className={ANIME_GRID_CLASS}>
        {relatedAnimes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
};

export default AnimeRelatedSection;
