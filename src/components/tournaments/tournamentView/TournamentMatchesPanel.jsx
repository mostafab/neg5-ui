import React, { useState } from "react";

import Card from "@components/common/cards";
import { Add } from "@components/common/icon";
import MatchesAccordian from "@components/tournaments/tournamentView/matches/MatchesAccordian";
import MatchesModal from "@components/tournaments/tournamentView/matches/MatchesModal";

const TournamentMatchesPanel = ({
  matches,
  teams,
  rules,
  playersById,
  phases,
}) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  return (
    <>
      {
        <Card
          title={
            <>
              <span>Matches ({matches.length})</span>
              <Add className="float-end" onClick={() => setSelectedMatch({})} />
            </>
          }
        >
          <MatchesAccordian
            matches={matches}
            teams={teams}
            onSelectMatch={(match) => setSelectedMatch(match)}
          />
        </Card>
      }
      {selectedMatch && (
        <MatchesModal
          matches={matches}
          teams={teams}
          selectedMatch={selectedMatch}
          onHide={() => setSelectedMatch(null)}
          onSelectMatch={(match) => setSelectedMatch(match)}
          rules={rules}
          playersById={playersById}
          phases={phases}
        />
      )}
    </>
  );
};

export default TournamentMatchesPanel;
