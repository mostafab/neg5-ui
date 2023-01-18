export default {
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  pusherConfig: {
    appKey: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    logOutput: process.env.NODE_ENV !== "production",
  },
};
