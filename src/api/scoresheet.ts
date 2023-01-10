import client from "./_client";

export const convertScoresheet = async (body) => {
  const response = await client.post("/neg5-api/scoresheets/convert", body);
  return await response.data;
};

export const submitScoresheet = async (body) => {
  const response = await client.post("/neg5-api/scoresheets/submit", body);
  return await response.data;
};

export const getScoresheet = async (scoresheetId) => {
  const response = await client.get(`/neg5-api/scoresheets/${scoresheetId}`);
  return await response.data;
};

export const createOrUpdateDraft = async (body) => {
  const response = await client.post("/neg5-api/scoresheets", body);
  return await response.data;
};

export const loadTournamentScoresheet = async (tournamentId) => {
  const response = await client.get(
    `/neg5-api/tournaments/${tournamentId}/scoresheets`
  );
  return await response.data;
};

export const deleteScoresheet = async (scoresheetId) => {
  const response = await client.delete(`/neg5-api/scoresheets/${scoresheetId}`);
  return await response.data;
};
