import client from "./_client";

export const createPhase = async (body) => {
  const response = await client.post(`/neg5-api/phases`, body);
  return await response.data;
};
