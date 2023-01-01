import client from "./_client";

export const createMatch = async (body) => {
  const response = await client.post(`/neg5-api/matches`, body);
  return await response.data;
};

export const updateMatch = async (body) => {
  const response = await client.put(`/neg5-api/matches/${body.id}`, body);
  return await response.data;
};
