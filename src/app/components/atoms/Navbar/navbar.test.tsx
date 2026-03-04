// Vitest is being used

import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

test("Navbar", () => {
  render(<Navbar />);
  expect(
    screen.getByRole("heading", { level: 1, name: "What Time Is F1?" }),
  ).toBeDefined();
});
