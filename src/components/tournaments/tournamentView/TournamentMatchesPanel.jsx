import React, { useState } from "react";

import Card from "@components/common/cards";
import MatchesAccordian from "@components/tournaments/tournamentView/matches/MatchesAccordian";
import MatchesModal from "@components/tournaments/tournamentView/matches/MatchesModal";

const TournamentMatchesPanel = ({ matches, teams, rules }) => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  return (
    <>
      {
        <Card title={`Matches (${matches.length})`}>
          <MatchesAccordian
            matches={matches}
            teams={teams}
            onSelectMatch={(match) => setSelectedMatchId(match.id)}
          />
        </Card>
      }
      {selectedMatchId && (
        <MatchesModal
          matches={matches}
          teams={teams}
          selectedMatchId={selectedMatchId}
          onHide={() => setSelectedMatchId(null)}
          onSelectMatch={(match) => setSelectedMatchId(match.id)}
          rules={rules}
        />
      )}
    </>
  );
};

export default TournamentMatchesPanel;
