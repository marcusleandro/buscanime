import {
  FeaturedClassics,
  HomeFeatures,
  HomeHero,
  PageContainer,
} from "@/components";

export const Home = () => {
  return (
    <PageContainer className="py-0">
      <HomeHero />
      <HomeFeatures />
      <FeaturedClassics />

      <div className="mt-16 flex flex-col items-center pb-8">
        <span className="rounded bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
          Pressione <kbd className="px-1">Ctrl</kbd> +{" "}
          <kbd className="px-1">D</kbd> ou use o botão no header para alternar o
          tema
        </span>
      </div>
    </PageContainer>
  );
};

export default Home;
