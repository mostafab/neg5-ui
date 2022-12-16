import client from './_client';

export const attemptLogin = async (body) => {
  try {
    const response = await client.post(`/neg5-api/login`, body);
    return response.headers['neg5_token'];
  } catch (e) {
    throw e;
  }
}