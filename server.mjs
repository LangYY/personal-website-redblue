import http from "node:http";
import { Readable } from "node:stream";
import handler from "./dist/server/index.js";

const port = Number(process.env.PORT || 8794);
const hostname = process.env.HOSTNAME || "127.0.0.1";

const server = http.createServer(async (req, res) => {
  try {
    const forwardedProto = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || `${hostname}:${port}`;
    const url = new URL(req.url || "/", `${forwardedProto}://${host}`);
    const headers = new Headers();

    for (const [name, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(name, Array.isArray(value) ? value.join(", ") : value);
      }
    }

    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    const body = hasBody ? Readable.toWeb(req) : undefined;
    const request = new Request(url, {
      method: req.method,
      headers,
      body,
      duplex: hasBody ? "half" : undefined,
    });
    const response = await handler.fetch(request, {}, { waitUntil() {} });

    res.statusCode = response.status;
    response.headers.forEach((value, name) => res.setHeader(name, value));

    if (req.method === "HEAD" || !response.body) {
      res.end();
      return;
    }

    Readable.fromWeb(response.body).pipe(res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(port, hostname, () => {
  console.log(`personal-website-redblue listening on http://${hostname}:${port}`);
});
