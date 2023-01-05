import client from "./_client";

export const addOrUpdateCollaborator = async (body) => {
  const response = await client.post(`/neg5-api/collaborators`, body);
  return await response.data;
};
