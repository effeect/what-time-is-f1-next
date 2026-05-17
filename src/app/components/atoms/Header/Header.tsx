import React from "react";
import CircuitImage from "../CircuitImage/CircuitImage";
// Header component for the main site
const RaceHeader = ({
  RaceName,
  CircuitName,
  CircuitUrl,
  CircuitId,
  Date,
}: {
  RaceName: string;
  CircuitName: string;
  CircuitUrl: string;
  CircuitId?: string;
  Date: string;
}) => {
  return (
    <div>
      <div className="columns is-vcentered has-text-centered">
        <div className="column">
          <h1 className="title is-2 mb-2">{RaceName}</h1>
          <div className="subtitle">
            <span className="icon">
              <i className="fas fa-flag-checkered"></i>
            </span>
            <a
              href={CircuitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              {CircuitName}
            </a>
          </div>
          {CircuitId ? (
            <CircuitImage circuitId={CircuitId} circuitName={CircuitName} />
          ) : null}
          <div className="subtitle">
            <span className="icon">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <span className="ml-2">Main event on {Date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceHeader;
