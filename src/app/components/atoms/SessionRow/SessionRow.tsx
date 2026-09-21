import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Sessions } from "@/types/session_detail";
import TimeDisplay from "../Time/TimeDisplay";
import DateDisplay from "../Time/DateDisplay";

const SessionRow = ({ session }: { session: Sessions }) => {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      {/* Left hand side of the container */}
      <div>
        <Typography
          variant="overline"
          component="p"
          color="text.secondary"
          sx={{ lineHeight: 1.5 }}
        >
          {session.name}
        </Typography>
        <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
          <DateDisplay dateTimeString={`${session.date}T${session.time}`} />
        </Typography>
      </div>
      {/* Right hand side of the container */}
      <Typography
        variant="h5"
        component="p"
        sx={{ fontWeight: 600, textAlign: "right" }}
      >
        {/* Nees to be handled on the client side fyi */}
        <TimeDisplay dateTimeString={`${session.date}T${session.time}`} />
      </Typography>
    </Stack>
  );
};

export default SessionRow;
