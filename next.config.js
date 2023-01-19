const ContentSecurityPolicy = `
  default-src 'self' wss://ws-mt1.pusher.com https://sockjs-mt1.pusher.com;
  img-src 'self' data:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com;
  child-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com;
  font-src 'self' https://fonts.gstatic.com;  
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  env: {
    PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
    PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER,
    PUSHER_ENABLED: process.env.PUSHER_ENABLED,
    NEG5_STATS_BASE_URL: process.env.NEG5_STATS_BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};
