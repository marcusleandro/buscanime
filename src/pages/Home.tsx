import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-10">
        <div className="max-w-lg space-y-5 text-center">
          <h2 className="font-heading text-2xl font-bold">
            Bem-vindo ao <span className="uppercase">Buscanime</span>
          </h2>
          <p className="text-muted-foreground">
            Encontre seus animes favoritos usando nossa busca com filtros.
            Navegue pela lista completa e aproveite a experiência!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/animes")}>
              Ir para lista de animes
            </Button>
            {/* 
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/not-found")}
            >
              Página não encontrada (teste)
            </Button> 
            */}
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <span className="rounded bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            Pressione <kbd className="px-1">d</kbd> para alternar entre
            Dark/Light mode
          </span>
        </div>
      </section>
    </PageContainer>
  );
};

export default Home;
