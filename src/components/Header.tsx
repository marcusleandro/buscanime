import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "grid h-[68px] w-full grid-cols-[1fr_auto_1fr] items-center bg-primary px-4 sm:px-6",
        className
      )}
    >
      <div aria-hidden />
      <BrandLogo size="header" asLink />
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
