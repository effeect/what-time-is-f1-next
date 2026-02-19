import React from "react";
import { Sessions } from "@/types/session_detail";
import TimeDisplay from "../Time/TimeDisplay";

const SessionRow = ({ session }: { session: Sessions }) => {
  return (
    <div className="level is-mobile">
      {/* Left hand side of the container */}
      <div className="level-left">
        <div>
          <p className="heading mb-1">{session.name}</p>
          <p className="title is-5">
            {new Date(session.date).toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
      </div>
      {/* Right hand side of the container */}
      <div className="level-right">
        <div>
          <p className="title is-4">
            {/* Nees to be handled on the client side fyi */}
            <TimeDisplay dateTimeString={`${session.date}T${session.time}`} />
          </p>
        </div>
        {/* <p className="title is-4">{formatTimeUTC(session.time)}</p> */}
      </div>
    </div>
  );
};

export default SessionRow;
