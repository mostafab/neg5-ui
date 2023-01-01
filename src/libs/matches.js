import orderBy from "lodash/orderBy";

import { MatchResult } from "@libs/enums";

export const getMatchTeamsDisplayString = (
  match,
  teamsById,
  { includeRound = false, teamSortParams = null } = {}
) => {
  const orderedTeams = teamSortParams
    ? orderBy(match.teams, ...teamSortParams)
    : orderBy(match.teams, "teamId");
  const base = orderedTeams
    .map((t) => {
      const teamName = teamsById[t.teamId]?.name;
      const score = t.forfeit ? "(Forfeit)" : t.score ? `(${t.score})` : "";
      return `${teamName} ${score}`;
    })
    .join(" vs ");

  if (includeRound && match.round) {
    return `Round ${match.round}: ${base}`;
  }
  return base;
};

export const getTeamMatchResult = (teamId, match) => {
  if (match.teams.length !== 2) {
    throw Error("Invalid match given. Cannot calculate result");
  }
  const matchingTeamIndex = match.teams.findIndex((t) => t.teamId === teamId);
  const thisTeam = match.teams[matchingTeamIndex];
  const otherTeam = match.teams[matchingTeamIndex === 0 ? 1 : 0];
  if (thisTeam.forfeit) {
    return MatchResult.Forfeit;
  } else if (otherTeam.forfeit) {
    return MatchResult.Win;
  }
  if (thisTeam.score > otherTeam.score) {
    return MatchResult.Win;
  } else if (thisTeam.score < otherTeam.score) {
    return MatchResult.Loss;
  }
  return MatchResult.Tie;
};
