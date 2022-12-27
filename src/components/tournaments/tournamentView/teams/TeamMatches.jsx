import React from "react";
import keyBy from "lodash/keyBy";

import MatchesList from "@components/tournaments/tournamentView/matches/MatchesList";
import Pill from "@components/common/pill";

import { MatchResult } from "@libs/enums";
import { getTeamMatchResult } from "@libs/matches";

import NoMatches from "./NoMatches";

const matchResultToPillType = {
  [MatchResult.Win]: "success",
  [MatchResult.Loss]: "danger",
  [MatchResult.Tie]: "secondary",
  [MatchResult.Forfeit]: "light",
};

const TeamMatches = ({ team, teams, matches }) => {
  const matchesForTeam = matches.filter((m) => {
    return m.teams.some((t) => t.teamId === team.id);
  });
  const teamsById = keyBy(teams, "id");
  return (
    <>
      {matchesForTeam.length === 0 && <NoMatches team={team} />}
      {matchesForTeam.length > 0 && (
        <>
          <h5>Played Matches</h5>
          <MatchesList
            matches={matchesForTeam}
            teamsById={teamsById}
            flush={false}
            displayRound={true}
            // Ensure the selected team is the first in the display string
            rowTeamsOrderParams={[(t) => (t.teamId === team.id ? -1 : 1)]}
            rowSideRender={(match) => {
              const result = getTeamMatchResult(team.id, match);
              const type = matchResultToPillType[result];
              return (
                <Pill className="float-end" type={type}>
                  {result}
                </Pill>
              );
            }}
          />
        </>
      )}
    </>
  );
};

export default TeamMatches;
