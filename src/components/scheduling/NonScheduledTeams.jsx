import React from "react";

import TeamList from "@components/tournaments/tournamentView/teams/TeamsList";

const NonScheduledTeams = ({ teams, scheduledMatches }) => {
  const scheduledTeams = new Set(
    scheduledMatches
      .map((m) => [m.team1Id, m.team2Id])
      .flatMap((teamIds) => teamIds)
  );
  const leftoverTeams = teams.filter((t) => !scheduledTeams.has(t.id));
  const title =
    leftoverTeams.length === 0
      ? "Unscheduled Teams"
      : `Unscheduled Teams (${leftoverTeams.length})`;
  return (
    <>
      <h6>
        <b>{title}</b>
      </h6>
      <TeamList teams={leftoverTeams} />
    </>
  );
};

export default NonScheduledTeams;
