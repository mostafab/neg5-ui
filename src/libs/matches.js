import orderBy from "lodash/orderBy";

export const getMatchTeamsDisplayString = (match, teamsById) =>
  orderBy(match.teams, "teamId")
    .map((t) => {
      const teamName = teamsById[t.teamId]?.name;
      const score = t.score;
      return `${teamName} (${score})`;
    })
    .join(" vs ");
