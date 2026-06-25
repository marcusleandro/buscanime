import { AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  /** When provided, renders a "Tentar novamente" action button. */
  onRetry?: () => void;
}

/**
 * Destructive alert for recoverable fetch failures.
 *
 * Default copy targets the anime list; pass custom `title`/`message` for other pages.
 */
export const ErrorState = ({
  title = "Algo deu errado",
  message = "Não foi possível carregar os animes. Verifique sua conexão e tente novamente.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      {onRetry && (
        <AlertAction>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Tentar novamente
          </Button>
        </AlertAction>
      )}
    </Alert>
  );
};

export default ErrorState;
