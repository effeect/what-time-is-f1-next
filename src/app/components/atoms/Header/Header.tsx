import React from "react";
import Link from "next/link";
// Header component for the main site
const RaceHeader = ({
  RaceName,
  CircuitName,
  Date,
}: {
  RaceName: string;
  CircuitName: string;
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
            <span className="ml-2">{CircuitName}</span>
          </div>
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
