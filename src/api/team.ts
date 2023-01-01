import client from "./_client";

export const createTeam = async (body) => {
  const response = await client.post(`/neg5-api/teams`, body);
  return await response.data;
};

export const updateTeam = async (body) => {
  const response = await client.put(`/neg5-api/teams/${body.id}`, body);
  return await response.data;
};
