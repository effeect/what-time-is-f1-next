import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import RaceHeader from "./Header";

afterEach(cleanup);

const baseProps = {
  RaceName: "Monaco Grand Prix",
  CircuitName: "Circuit de Monaco",
  CircuitUrl: "https://en.wikipedia.org/wiki/Circuit_de_Monaco",
  Country: "Monaco",
  Date: "Sunday, 24 May",
};

test("renders a track map image when TrackMap is provided", () => {
  render(
    <RaceHeader
      {...baseProps}
      TrackMap={{ src: "/track-maps/monaco.svg" }}
    />,
  );
  expect(screen.getByAltText(/circuit layout diagram/i)).toBeDefined();
});

test("renders no track map image when TrackMap is omitted", () => {
  render(<RaceHeader {...baseProps} />);
  expect(screen.queryByAltText(/circuit layout diagram/i)).toBeNull();
});
