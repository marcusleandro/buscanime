import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NotFoundPage = () => {
  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-primary text-primary-foreground`}
    >
      <div className="flex w-full max-w-[476px] flex-col items-center gap-8 px-4 sm:px-6">
        <div className="flex w-full flex-col items-center gap-4">
          <h1
            className="text-center leading-none font-medium tracking-[-0.03em] text-primary-foreground"
            style={{
              fontSize: "clamp(120px, 30vw, 232px)",
              lineHeight: "1em",
            }}
          >
            404
          </h1>
          <p
            className="w-full text-center leading-[1.3] text-primary-foreground"
            style={{ fontSize: "18px", lineHeight: "1.3em" }}
          >
            The page you are looking for was moved, removed, renamed or might
            have never existed!
          </p>
        </div>
        <Button
          asChild
          variant="default"
          size="lg"
          className="rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
