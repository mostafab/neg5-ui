import React from "react";
import keyBy from "lodash/keyBy";

import MatchesList from "@components/tournaments/tournamentView/matches/MatchesList";

const TeamMatches = ({ team, teams, matches }) => {
  const matchesForTeam = matches.filter((m) => {
    return m.teams.some((t) => t.teamId === team.id);
  });
  const teamsById = keyBy(teams, "id");
  return (
    <>
      <h5>Played Matches</h5>
      <MatchesList
        matches={matchesForTeam}
        teamsById={teamsById}
        flush={false}
        displayRound={true}
        // Ensure the selected team is the first in the display string
        rowTeamsOrderParams={[(t) => (t.teamId === team.id ? -1 : 1)]}
      />
    </>
  );
};

export default TeamMatches;
