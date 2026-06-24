import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "header" | "footer";
  asLink?: boolean;
  className?: string;
}

export const BrandLogo = ({
  size = "header",
  asLink = false,
  className,
}: BrandLogoProps) => {
  const content = (
    <>
      <span className="text-white">Busc</span>
      <span className="text-secondary">Anime</span>
    </>
  );

  const classes = cn(
    "font-heading leading-none uppercase",
    size === "header" ? "text-[40px]" : "text-2xl",
    className
  );

  if (asLink) {
    return (
      <Link
        to="/"
        className={cn(classes, "transition-opacity hover:opacity-90")}
        aria-label="Buscanime - ir para a página inicial"
      >
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
};

export default BrandLogo;
