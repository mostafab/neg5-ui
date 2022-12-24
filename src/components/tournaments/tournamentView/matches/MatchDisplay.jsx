import React from "react";

import MatchForm from "./MatchForm";

const MatchDisplay = ({ matches, selectedMatchId }) => {
  const match = selectedMatchId
    ? matches.find((m) => m.id === selectedMatchId)
    : {};
  return (
    <div className="sticky-top">
      <MatchForm match={match} />
    </div>
  );
};

export default MatchDisplay;
