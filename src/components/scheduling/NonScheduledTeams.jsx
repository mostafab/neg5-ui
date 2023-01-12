import React from "react";
import orderBy from "lodash/orderBy";

import TeamList from "@components/tournaments/tournamentView/teams/TeamsList";

const NonScheduledTeams = ({ teams, scheduledMatches, className = "" }) => {
  const scheduledTeams = new Set(
    scheduledMatches
      .map((m) => [m.team1Id, m.team2Id])
      .flatMap((teamIds) => teamIds)
  );
  const leftoverTeams = orderBy(
    teams.filter((t) => !scheduledTeams.has(t.id)),
    "name"
  );
  const title =
    leftoverTeams.length === 0
      ? "Unscheduled Teams"
      : `Unscheduled Teams (${leftoverTeams.length})`;
  return (
    <div className={className}>
      <h6>
        <b>{title}</b>
      </h6>
      <TeamList teams={leftoverTeams} />
    </div>
  );
};

export default NonScheduledTeams;
