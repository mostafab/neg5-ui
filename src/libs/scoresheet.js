import orderBy from "lodash/orderBy";
import mapValues from "lodash/mapValues";
import keyBy from "lodash/keyBy";

export const orderPlayers = (players, playerIdOrderings) => {
  return orderBy(players, (p) => playerIdOrderings.indexOf(p.id));
};

export const buildPlayersSummary = (teams, cycles, rules) => {
  const initialTossupCounts = mapValues(
    keyBy(rules.tossupValues, "value"),
    (v) => 0
  );
  const playerValues = {};
  teams
    .flatMap((team) => team.players)
    .forEach((player) => {
      playerValues[player.id] = {
        tossupsHeard: 0,
        tossupValueCounts: { ...initialTossupCounts },
      };
    });
  cycles.forEach(({ activePlayers, answers }) => {
    activePlayers.forEach((playerId) => {
      playerValues[playerId].tossupsHeard++;
    });

    answers.forEach(({ playerId, value }) => {
      playerValues[playerId].tossupValueCounts[value]++;
    });
  });

  return playerValues;
};

export const getMatchesToBePlayed = (matches, schedules) => {
  return (
    schedules
      .flatMap((s) => s.matches)
      // Filter out byes
      .filter(({ team1Id, team2Id }) => team1Id && team2Id)
      .filter(({ team1Id, team2Id, round: scheduledRound }) => {
        return !matches.some(({ round: matchRound, teams }) => {
          if (matchRound !== scheduledRound) {
            return false;
          }
          const [team1, team2] = teams;
          return (
            (team1.teamId === team1Id || team1.teamId === team2Id) &&
            (team2.teamId === team1Id || team2.teamId === team2Id)
          );
        });
      })
  );
};
