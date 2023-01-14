import client from "./_client";

export const generateSchedule = async (body) => {
  const response = await client.post("/neg5-api/scheduling/generate", body);
  return await response.data;
};

export const updateSchedule = async (body) => {
  const response = await client.put(`/neg5-api/scheduling/${body.id}`, body);
  return await response.data;
};

export const createSchedule = async (body) => {
  const response = await client.post("/neg5-api/scheduling", body);
  return await response.data;
};

export const loadSchedules = async (tournamentId) => {
  const response = await client.get(
    `/neg5-api/tournaments/${tournamentId}/schedules`
  );
  return await response.data;
};
