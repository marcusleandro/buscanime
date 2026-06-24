import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ErrorState, PageContainer } from "@/components";
import { NotFound } from "@/pages/NotFound";

export const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  const message =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? error.statusText || String(error.data)
        : "Ocorreu um erro inesperado.";

  const title = isRouteErrorResponse(error)
    ? `Erro ${error.status}`
    : undefined;

  return (
    <PageContainer>
      <ErrorState title={title} message={message} />
      {import.meta.env.DEV && error instanceof Error && error.stack ? (
        <pre className="mt-4 overflow-auto text-xs text-muted-foreground">
          {error.stack}
        </pre>
      ) : null}
    </PageContainer>
  );
};

export default RootErrorBoundary;
