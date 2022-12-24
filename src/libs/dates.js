import dayjs from "dayjs";

export const formatAddedAtDate = (addedAtDate) =>
  dayjs(addedAtDate).format("MMM DD h:mm A");
