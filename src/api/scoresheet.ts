import client from "./_client";

export const convertScoresheet = async (body) => {
  const response = await client.post("/neg5-api/scoresheets/convert", body);
  return await response.data;
};

export const submitScoresheet = async (body) => {
  const response = await client.post("/neg5-api/scoresheets/submit", body);
  return await response.data;
};
