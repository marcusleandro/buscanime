import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "flex h-[54px] w-full flex-col items-center justify-center gap-0.5 bg-primary",
        className
      )}
    >
      <BrandLogo size="footer" />
      <p className="text-[10px] leading-none text-white uppercase">
        Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
