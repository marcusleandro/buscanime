import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Controlled search input synced with the anime list filters. */
export const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar anime...",
}: SearchBarProps) => {
  return (
    <InputGroup className="h-10 rounded-sm">
      <InputGroupAddon className="rounded-sm">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label="Buscar anime"
        placeholder={placeholder}
        value={value}
        className="rounded-sm"
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
