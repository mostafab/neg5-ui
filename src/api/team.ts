import client from "./_client";

export const createTeam = async (body) => {
  const response = await client.post(`/neg5-api/teams`, body);
  return await response.data;
};

export const updateTeam = async (body) => {
  const response = await client.put(`/neg5-api/teams/${body.id}`, body);
  return await response.data;
};

export const deleteTeam = async (teamId) => {
  const response = await client.delete(`/neg5-api/teams/${teamId}`);
  return await response.data;
};

export const batchUpdateTeamPools = async (body) => {
  const response = await client.post("/neg5-api/team-pools/batch", body);
  return await response.data;
};

export const createTeamGroup = async (body) => {
  const response = await client.post(`/neg5-api/teams/group`, body);
  return await response.data;
};
