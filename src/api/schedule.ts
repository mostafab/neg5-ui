import client from "./_client";

export const generateSchedule = async (body) => {
  const response = await client.post("/neg5-api/scheduling/generate", body);
  return await response.data;
};
