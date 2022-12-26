import orderBy from "lodash/orderBy";

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
      const score = t.score;
      return `${teamName} (${score})`;
    })
    .join(" vs ");

  if (includeRound && match.round) {
    return `Round ${match.round}: ${base}`;
  }
  return base;
};
