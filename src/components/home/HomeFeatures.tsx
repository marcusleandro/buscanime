import { FilterIcon, SearchIcon, StarIcon } from "lucide-react";

const FEATURES = [
  {
    icon: SearchIcon,
    title: "Busca inteligente",
    description: "Encontre animes pelo nome em segundos.",
  },
  {
    icon: FilterIcon,
    title: "Filtros por formato",
    description: "TV, filme, OVA e mais — refine sua busca.",
  },
  {
    icon: StarIcon,
    title: "Scores e gêneros",
    description: "Veja notas e categorias de cada título.",
  },
] as const;

export const HomeFeatures = () => {
  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFeatures;
