import { FilmIcon, SearchXIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyStateProps {
  search?: string;
}

export const EmptyState = ({ search }: EmptyStateProps) => {
  const hasSearch = Boolean(search?.trim());

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {hasSearch ? <SearchXIcon /> : <FilmIcon />}
        </EmptyMedia>
        <EmptyTitle>
          {hasSearch ? "Nenhum anime encontrado" : "Nenhum anime disponível"}
        </EmptyTitle>
        <EmptyDescription>
          {hasSearch
            ? `Não encontramos resultados para "${search}". Tente outro termo ou formato.`
            : "Não há animes para exibir no momento."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyState;
