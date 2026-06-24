import type { AnimeDetail } from "@/services/anime";

interface AnimeDetailSynopsisProps {
  description: AnimeDetail["description"];
}

export const AnimeDetailSynopsis = ({
  description,
}: AnimeDetailSynopsisProps) => {
  if (!description) {
    return (
      <section aria-labelledby="synopsis-heading">
        <h2 id="synopsis-heading" className="mb-4 font-heading text-2xl font-bold">
          Sinopse
        </h2>
        <p className="text-muted-foreground">Sinopse indisponível.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="synopsis-heading">
      <h2 id="synopsis-heading" className="mb-4 font-heading text-2xl font-bold">
        Sinopse
      </h2>
      <div
        className="max-w-none space-y-3 text-foreground leading-relaxed [&_br]:block [&_i]:text-muted-foreground [&_p]:text-sm [&_p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
};

export default AnimeDetailSynopsis;
