export const setLoginCookie = (token) =>
  (document.cookie = `NEG5_TOKEN=${token};Secure;Path=/`);
