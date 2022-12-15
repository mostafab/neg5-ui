const path = require("path");
const express = require("express");
const compression = require("compression");
const next = require("next");
const helmet = require("helmet");
const morgan = require("morgan");
const proxy = require("express-http-proxy");

const port = parseInt(process.env.PORT, 10) || 3100;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(helmet());
    server.use(compression());
    if (process.env.NODE_ENV !== "production") {
      server.use(morgan());
    }

    const staticPath = path.join(__dirname, "../static");
    server.use(
      "/static",
      express.static(staticPath, {
        maxAge: "30d",
        immutable: true,
      })
    );

    server.use(
      "/neg5-api",
      proxy(process.env.NEG5_API_HOST, {
        proxyReqPathResolver: (req) => `/neg5-api${req.url}`,
      })
    );

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(port, () => {
      console.log(`[neg5-ui] Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("NextJS failed to initialize.");
    console.error(err);
  });
