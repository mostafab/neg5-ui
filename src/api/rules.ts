import client from "./_client";

export const updateRules = async (tournamentId, body) => {
  const response = await client.put(
    `/neg5-api/tournaments/${tournamentId}/rules`,
    body
  );
  return await response.data;
};
