export default {
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  pusherConfig: {
    enabled:
      process.env.PUSHER_ENABLED !== undefined
        ? Boolean(process.env.PUSHER_ENABLED)
        : false,
    appKey: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    logOutput: process.env.NODE_ENV !== "production",
  },
  statsBaseUrl: process.env.NEG5_STATS_BASE_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};
