import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex h-[68px] w-full items-center justify-center bg-primary",
        className
      )}
    >
      <BrandLogo size="header" asLink />
    </header>
  );
};

export default Header;
