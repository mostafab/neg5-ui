import client from "./_client";

export const getUserTournaments = async () =>
  await (
    await client.get("/neg5-api/tournaments")
  ).data;

export const createTournament = async (data) =>
  await (
    await client.post("/neg5-api/tournaments", data)
  ).data;

export const getPermissions = async (tournamentId) =>
  await (
    await client.get(`/neg5-api/tournaments/${tournamentId}/permissions`)
  ).data;

export const loadInformation = async (tournamentId) =>
  await (
    await client.get(`/neg5-api/tournaments/${tournamentId}`)
  ).data;

export const loadMatches = async (tournamentId) =>
  await (
    await client.get(`/neg5-api/tournaments/${tournamentId}/matches`)
  ).data;
