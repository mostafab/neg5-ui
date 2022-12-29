import React, { useState } from "react";

import Card from "@components/common/cards";
import Icon, { Add } from "@components/common/icon";

import ScoresheetModal from "@components/scoresheet/ScoresheetModal";
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
  const [showScoresheet, setShowScoresheet] = useState(false);
  return (
    <>
      {
        <Card
          title={
            <div className="d-flex justify-content-between">
              <span>Matches ({matches.length})</span>
              <span className="d-flex justify-content-between">
                <Add message="Add Match" onClick={() => setSelectedMatch({})} />
                <Icon
                  className="ms-2"
                  name="Clipboard"
                  message="Start a Scoresheet"
                  onClick={() => setShowScoresheet(true)}
                />
              </span>
            </div>
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
      {showScoresheet && (
        <ScoresheetModal
          onHide={() => setShowScoresheet(false)}
          teams={teams}
          rules={rules}
          phases={phases}
        />
      )}
    </>
  );
};

export default TournamentMatchesPanel;
