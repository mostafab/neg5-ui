import client from "./_client";

export const getUserTournaments = async () =>
  await (
    await client.get("/neg5-api/tournaments")
  ).data;

export const createTournament = async (data) =>
  await (
    await client.post("neg5-api/tournaments", data)
  ).data;
