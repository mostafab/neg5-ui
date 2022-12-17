import client from "./_client";

export const getUserTournaments = async () =>
  await (
    await client.get("/neg5-api/tournaments")
  ).data;
