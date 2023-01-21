const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const next = require("next");
const helmet = require("helmet");
const morgan = require("morgan");
const proxy = require("express-http-proxy");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const port = process.env.PORT || 3100;
    const server = express();

    server.use(
      helmet({
        crossOriginOpenerPolicy: {
          policy: "same-origin-allow-popups",
        },
      })
    );
    server.use(compression());
    server.use(cookieParser());
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
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
          if (srcReq.cookies["NEG5_TOKEN"]) {
            proxyReqOpts.headers = {
              ["NEG5_TOKEN"]: srcReq.cookies["NEG5_TOKEN"],
            };
          }
          return proxyReqOpts;
        },
      })
    );

    server.get("*", async (req, res) => {
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
