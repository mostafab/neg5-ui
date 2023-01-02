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
