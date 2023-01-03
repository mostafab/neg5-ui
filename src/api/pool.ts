import client from "./_client";

export const createPool = async (body) => {
  const response = await client.post(`/neg5-api/pools`, body);
  return await response.data;
};
