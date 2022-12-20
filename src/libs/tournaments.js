import dayjs from "dayjs";

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
    const diff = now.diff(dayJsDate);
    if (diff < 0) {
      upcoming.push(t);
    } else {
      past.push(t);
    }
  });
  return {
    past,
    upcoming,
  };
};
