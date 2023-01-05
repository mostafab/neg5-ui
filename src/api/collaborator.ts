import client from "./_client";

export const addOrUpdateCollaborator = async (body) => {
  const response = await client.post(`/neg5-api/collaborators`, body);
  return await response.data;
};

export const deleteCollaborator = async (body) => {
  const response = await client.post("/neg5-api/collaborators/delete", body);
  return await response.data;
};
