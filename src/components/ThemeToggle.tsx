import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Tooltip delayDuration={1500}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            "relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
            className
          )}
          aria-label={
            resolvedTheme === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
          onClick={(event) => {
            toggleTheme({ x: event.clientX, y: event.clientY });
          }}
        >
          <Sun className="size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        Clique para alternar entre modo claro e escuro
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
