import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { countryFlag } from "@/lib/countryFlag";

// Header component for the main race
// Displays the race name, circuit name, country flag, and date of the main event
const RaceHeader = ({
  RaceName,
  CircuitName,
  CircuitUrl,
  Country,
  Date,
}: {
  RaceName: string;
  CircuitName: string;
  CircuitUrl: string;
  Country?: string;
  Date: string;
}) => {
  // Grabs the country flag emoji based on the country name
  const flag = countryFlag(Country);

  const subtitleSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 1,
  } as const;
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
        {RaceName}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        color="text.secondary"
        sx={subtitleSx}
      >
        <SportsScoreIcon fontSize="small" />
        <Link href={CircuitUrl} target="_blank" rel="noopener noreferrer">
          {CircuitName}
        </Link>
        {Country ? (
          <span>
            ·{" "}
            {flag ? (
              <span role="img" aria-label={Country}>
                {flag}
              </span>
            ) : null}{" "}
            {Country}
          </span>
        ) : null}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        color="text.secondary"
        sx={subtitleSx}
      >
        <CalendarMonthIcon fontSize="small" />
        <span>Main event on {Date}</span>
      </Typography>
    </Box>
  );
};

export default RaceHeader;
