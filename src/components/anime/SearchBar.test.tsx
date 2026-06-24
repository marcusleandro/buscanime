import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder and calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SearchBar value="" onChange={onChange} placeholder="Buscar teste" />
    );

    const input = screen.getByRole("searchbox", { name: "Buscar anime" });
    expect(input).toHaveAttribute("placeholder", "Buscar teste");

    await user.type(input, "naruto");
    expect(onChange).toHaveBeenCalled();
  });
});
