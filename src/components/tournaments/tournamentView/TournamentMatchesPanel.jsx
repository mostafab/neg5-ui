import React from "react";

import Card from "@components/common/cards";
import MatchesAccordian from "@components/tournaments/tournamentView/matches/MatchesAccordian";

const TournamentMatchesPanel = ({ matches, teams }) => {
  return (
    <Card title={`Matches (${matches.length})`}>
      <MatchesAccordian matches={matches} teams={teams} />
    </Card>
  );
};

export default TournamentMatchesPanel;
