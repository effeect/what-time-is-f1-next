import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LinkButton from "@/app/components/common/LinkButton";

// Bulma-style responsive visibility helpers
const hiddenMobile = { display: { xs: "none", sm: "inline" } } as const;
const hiddenTablet = { display: { xs: "inline", sm: "none" } } as const;

const NavigationBar = ({ data, round }: { data: any; round: number }) => {
  const roundNumber = Number(round);
  const nextRace = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === String(roundNumber + 1),
  );

  const prevRace = data.customRaceData.find(
    (item: any) => item.race.sessions.race.round === String(roundNumber - 1),
  );

  return (
    <>
      {/* Navigation Controls */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", mt: 6, mb: 3 }}
      >
        {/* Previous Button */}
        {prevRace ? (
          <LinkButton
            variant="outlined"
            href={`/race/${prevRace.race.sessions.race.round}`}
          >
            <span>←</span>
            {/* Shows race name on Desktop, hides on Mobile */}
            <Box component="span" sx={{ ml: 0.5, ...hiddenMobile }}>
              {prevRace.race.name}
            </Box>
            {/* Shows 'Prev' on Mobile, hides on Desktop */}
            <Box component="span" sx={{ ml: 0.5, ...hiddenTablet }}>
              Prev
            </Box>
          </LinkButton>
        ) : (
          <Button variant="outlined" disabled>
            ← Prev
          </Button>
        )}

        {/* Current Status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "action.hover",
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          {roundNumber}
          <Box component="span" sx={hiddenMobile}>
            &nbsp;of&nbsp;
          </Box>
          <Box component="span" sx={hiddenTablet}>
            /
          </Box>
          {data.customRaceData.length}
        </Box>

        {/* Next Button */}
        {nextRace ? (
          <LinkButton
            variant="outlined"
            href={`/race/${nextRace.race.sessions.race.round}`}
          >
            <Box component="span" sx={{ mr: 0.5, ...hiddenMobile }}>
              {nextRace.race.name}
            </Box>
            <Box component="span" sx={{ mr: 0.5, ...hiddenTablet }}>
              Next
            </Box>
            <span>→</span>
          </LinkButton>
        ) : (
          <Button variant="outlined" disabled>
            Next →
          </Button>
        )}
      </Stack>
    </>
  );
};

export default NavigationBar;
