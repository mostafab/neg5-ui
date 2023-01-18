const ContentSecurityPolicy = `
  default-src 'self' wss://ws-mt1.pusher.com https://sockjs-mt1.pusher.com;
  img-src 'self' data:;
  script-src 'self' 'unsafe-eval';
  child-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
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
  },
};
