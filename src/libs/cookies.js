export const setLoginCookie = (token) =>
  (document.cookie = `NEG5_TOKEN=${token};Secure;Path=/`);

export const clearLoginCookie = () =>
  (document.cookie =
    "NEG5_TOKEN=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT");
