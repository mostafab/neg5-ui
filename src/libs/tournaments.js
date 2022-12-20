import dayjs from "dayjs";
import orderBy from "lodash/orderBy";

export const splitByPastOrUpcoming = (tournaments) => {
  const past = [];
  const upcoming = [];
  const now = dayjs().endOf("day");
  tournaments.forEach((t) => {
    if (!t.tournamentDate) {
      upcoming.push(t);
      return;
    }
    const dayJsDate = dayjs(t.tournamentDate).startOf("day");
    const diff = now.diff(dayJsDate, "day");
    if (diff <= 0) {
      upcoming.push(t);
    } else {
      past.push(t);
    }
  });
  const sortPropFunc = (t) =>
    t.tournamentDate ? new Date(t.tournamentDate) : new Date(0);
  return {
    past: orderBy(past, sortPropFunc, ["desc"]),
    upcoming: orderBy(upcoming, sortPropFunc, ["asc"]),
  };
};
