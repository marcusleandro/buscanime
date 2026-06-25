import type { ForwardRefExoticComponent, JSX, RefAttributes } from "react";
import {
  FilterIcon,
  SearchIcon,
  StarIcon,
  type LucideProps,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HomeFeature = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  accent: string;
  iconRing: string;
};

const FEATURES: HomeFeature[] = [
  {
    icon: SearchIcon,
    title: "Busca inteligente",
    description:
      "Digite o nome e encontre títulos em segundos, sem precisar navegar por páginas.",
    accent: "from-primary/15 to-primary/5",
    iconRing:
      "ring-primary/25 group-hover:bg-primary group-hover:text-primary-foreground",
  },
  {
    icon: FilterIcon,
    title: "Filtros por formato",
    description:
      "Refine por TV, filme, OVA e outros formatos para chegar ao anime certo.",
    accent: "from-secondary/20 to-secondary/5",
    iconRing:
      "ring-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground",
  },
  {
    icon: StarIcon,
    title: "Scores e gêneros",
    description:
      "Veja notas, categorias e detalhes de cada título antes de escolher o próximo.",
    accent: "from-success/15 to-success/5",
    iconRing:
      "ring-success/25 group-hover:bg-success group-hover:text-success-foreground",
  },
];

const HomeFeaturesHeader = (): JSX.Element => {
  return (
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Por que usar
      </p>
      <h2
        id="home-features-heading"
        className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Tudo para explorar animes
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
        Ferramentas pensadas para você descobrir, filtrar e comparar títulos com
        rapidez.
      </p>
    </div>
  );
};

const HomeFeatureCard = ({
  icon: Icon,
  title,
  description,
  accent,
  iconRing,
}: HomeFeature): JSX.Element => {
  return (
    <Card
      className={cn(
        "group relative gap-0 overflow-hidden border-0 bg-muted/30 py-0 ring-1 ring-foreground/8",
        "transition-[box-shadow,background-color] duration-300",
        "hover:bg-muted/50 hover:shadow-lg hover:ring-primary/15",
        "motion-reduce:transition-none"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br opacity-60",
          accent
        )}
      />
      <CardHeader className="relative gap-4 pt-(--card-spacing) pb-2">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl bg-background/80 text-primary shadow-sm ring-1",
            "transition-colors duration-300 motion-reduce:transition-none",
            iconRing
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative pb-6">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export const HomeFeatures = (): JSX.Element => {
  return (
    <section className="py-16" aria-labelledby="home-features-heading">
      <HomeFeaturesHeader />

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {FEATURES.map((feature) => (
          <HomeFeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default HomeFeatures;
