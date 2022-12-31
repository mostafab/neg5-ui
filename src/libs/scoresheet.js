import orderBy from "lodash/orderBy";

export const orderPlayers = (players, playerIdOrderings) => {
  return orderBy(players, (p) => playerIdOrderings.indexOf(p.id));
};
