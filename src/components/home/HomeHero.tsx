import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PosterStack } from "./PosterStack";

export const HomeHero = () => {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="flex min-h-[calc(100dvh-68px)] flex-col justify-center py-10 lg:py-12"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/25 px-6 py-10 shadow-sm sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -right-16 size-64 rounded-full bg-primary/8 blur-3xl dark:bg-primary/12" />
          <div className="absolute -bottom-20 -left-12 size-56 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/8" />
        </div>

        <div className="relative grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              Catálogo anime
            </p>
            <h1
              id="home-hero-heading"
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Bem-vindo ao{" "}
              <span className="text-secondary uppercase">Buscanime</span>
            </h1>
            <p className="max-w-lg text-muted-foreground">
              Encontre seus animes favoritos usando nossa busca com filtros.
              Navegue pela lista completa e aproveite a experiência!
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2 lg:justify-start">
              <Button asChild size="lg">
                <Link to="/animes">Ir para lista de animes</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/animes">
                  <SearchIcon />
                  Buscar animes
                </Link>
              </Button>
            </div>
          </div>
          <PosterStack />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
