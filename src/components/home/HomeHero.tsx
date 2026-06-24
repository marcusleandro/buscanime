import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components";
import { PosterStack } from "./PosterStack";

export const HomeHero = () => {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-5">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          Catálogo anime
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Bem-vindo ao{" "}
          <span className="text-secondary uppercase">Buscanime</span>
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Encontre seus animes favoritos usando nossa busca com filtros. Navegue
          pela lista completa e aproveite a experiência!
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
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
    </section>
  );
};

export default HomeHero;
