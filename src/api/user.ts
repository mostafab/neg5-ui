import axios from "axios";

import client, { baseUrl } from "./_client";

const TOKEN_NAME = "NEG5_TOKEN";

export const getUser = async () => {
  return await (
    await client.get("/neg5-api/accounts/me")
  ).data;
};

export const searchForUsers = async (query) => {
  return await (
    await client.get(`/neg5-api/accounts/search?query=${query}`)
  ).data;
};

export const getServerSideUser = async (request) => {
  const userCookie = request.cookies[TOKEN_NAME];
  if (!userCookie) {
    return null;
  }
  const response = await axios.get(`/neg5-api/accounts/me`, {
    baseURL: baseUrl(),
    headers: {
      ["Cookie"]: `NEG5_TOKEN=${userCookie}`,
    },
  });
  return response.data;
};
