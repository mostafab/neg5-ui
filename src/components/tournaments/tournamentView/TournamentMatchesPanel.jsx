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
  currentUser,
}) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showScoresheet, setShowScoresheet] = useState(false);
  const enoughTeamsToAddMatch = teams.length >= 2;
  return (
    <>
      <Card
        title={<span>Matches ({matches.length})</span>}
        actions={
          enoughTeamsToAddMatch && matches.length > 0
            ? [
                {
                  component: (
                    <Add
                      message="Add Match"
                      onClick={() => setSelectedMatch({})}
                    />
                  ),
                },
                {
                  icon: "Clipboard",
                  onClick: () => setShowScoresheet(true),
                },
              ]
            : []
        }
      >
        {!enoughTeamsToAddMatch && (
          <div className="d-flex p-2 justify-content-center">
            Add at least two teams to add matches.
          </div>
        )}
        {enoughTeamsToAddMatch && matches.length === 0 && (
          <div className="d-flex p-2 justify-content-center">
            <div style={{ textAlign: "center" }}>
              No matches have been added yet. You can{" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMatch({});
                }}
                href=""
              >
                manually record
              </a>{" "}
              a match, or use the{" "}
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setShowScoresheet(true);
                }}
              >
                scoresheet
              </a>{" "}
              for future matches.
            </div>
          </div>
        )}
        <MatchesAccordian
          matches={matches}
          teams={teams}
          onSelectMatch={(match) => setSelectedMatch(match)}
        />
      </Card>
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
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default TournamentMatchesPanel;
