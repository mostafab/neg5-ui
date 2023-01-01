import client from "./_client";

export const attemptLogin = async (body) => {
  const response = await client.post(`/neg5-api/login`, body);
  return response.headers["neg5_token"];
};

export const attemptRegister = async (body) => {
  const response = await client.post("/neg5-api/accounts", body);
  return {
    token: response.headers["neg5_token"],
    data: response.data,
  };
};
