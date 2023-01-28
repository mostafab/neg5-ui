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

export const loadTeams = async (tournamentId) =>
  await (
    await client.get(`/neg5-api/tournaments/${tournamentId}/teams`)
  ).data;

export const loadTeamGroups = async (tournamentId) =>
  await (
    await client.get(`/neg5-api/tournaments/${tournamentId}/team-groups`)
  ).data;

export const loadCollaborators = async (tournamentId) =>
  await (
    await client.get(`/neg5-api/tournaments/${tournamentId}/collaborators`)
  ).data;

export const updateBasicInformation = async (tournamentId, body) => {
  const response = await client.put(
    `/neg5-api/tournaments/${tournamentId}`,
    body
  );
  return await response.data;
};
