import React from "react";
import { formatAddedAtDate } from "@libs/dates";

import MatchForm from "./MatchForm";

const MatchDisplay = ({ selectedMatch, teams, rules, playersById, phases }) => {
  const match = selectedMatch;
  return (
    <div className="sticky-top">
      {match.addedAt && (
        <p className="small text-dark">
          Added {formatAddedAtDate(match.addedAt)}
        </p>
      )}
      <MatchForm
        match={match}
        teams={teams}
        rules={rules}
        playersById={playersById}
        phases={phases}
      />
    </div>
  );
};

export default MatchDisplay;
