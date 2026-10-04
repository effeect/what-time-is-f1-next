import { expect, test } from "vitest";
import { trackMapPath } from "./trackMap";

test("trackMapPath returns a local asset path for a mapped circuit", () => {
  expect(trackMapPath("monaco")).toBe("/track-maps/monaco.svg");
});

test("trackMapPath returns null for an unmapped circuit", () => {
  expect(trackMapPath("not_a_real_circuit")).toBeNull();
});

test("trackMapPath returns null when no circuitId is given", () => {
  expect(trackMapPath(undefined)).toBeNull();
});
