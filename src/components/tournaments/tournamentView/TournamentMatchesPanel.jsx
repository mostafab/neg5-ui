/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";

import Card from "@components/common/cards";
import Icon, { Add } from "@components/common/icon";
import Pill from "@components/common/pill";

import ScoresheetModal from "@components/scoresheet/ScoresheetModal";
import SchedulingModal from "@components/scheduling/SchedulingModal";
import MatchesAccordian from "@components/tournaments/tournamentView/matches/MatchesAccordian";
import MatchesModal from "@components/tournaments/tournamentView/matches/MatchesModal";

const TournamentMatchesPanel = ({
  matches,
  draftScoresheets,
  teams,
  rules,
  playersById,
  phases,
  currentUser,
}) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showScoresheet, setShowScoresheet] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const enoughTeamsToAddMatch = teams.length >= 2;
  const actions =
    enoughTeamsToAddMatch && matches.length > 0
      ? [
          {
            component: (
              <Add message="Add Match" onClick={() => setSelectedMatch({})} />
            ),
          },
          {
            component: (
              <Icon
                className="ms-2"
                name="ClipboardPlus"
                message="Start a Scoresheet"
                onClick={() => setShowScoresheet(true)}
              />
            ),
          },
        ]
      : [];
  actions.push({
    component: (
      <Icon
        name="Calendar"
        className="ms-2"
        message="Schedule"
        onClick={() => setShowSchedule(true)}
      />
    ),
  });
  return (
    <>
      <Card
        title={
          <span>Matches {matches.length > 0 && `(${matches.length})`}</span>
        }
        actions={actions}
      >
        {draftScoresheets.length > 0 && (
          <Pill type="info" className="mb-2">
            {draftScoresheets.length}{" "}
            {draftScoresheets.length === 1 ? "scoresheet" : "scoresheets"} in
            progress
          </Pill>
        )}
        {!enoughTeamsToAddMatch && (
          <div className="d-flex p-2 justify-content-center">
            Add at least two teams to add matches.
          </div>
        )}
        {enoughTeamsToAddMatch && matches.length === 0 && (
          <div className="d-flex p-2 justify-content-center">
            <div style={{ textAlign: "center" }}>
              When you're ready, you can{" "}
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
              for future matches. Matches you or any collaborators add will show
              up here.
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
          scoresheets={draftScoresheets}
          onViewCreatedMatch={(matchId) => {
            setShowScoresheet(false);
            setSelectedMatch(matches.find((m) => m.id === matchId));
          }}
        />
      )}
      {showSchedule && (
        <SchedulingModal
          teams={teams}
          phases={phases}
          onHide={() => setShowSchedule(false)}
        />
      )}
    </>
  );
};

export default TournamentMatchesPanel;
