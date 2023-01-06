import client from "./_client";

export const convertScoresheet = async (body) => {
  const response = await client.post("/neg5-api/scoresheets/convert", body);
  return await response.data;
};
