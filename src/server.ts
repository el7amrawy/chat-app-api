import express, { Application } from "express";
import socket from "./services/socket";
import { createServer } from "http";
import routes from "./api";

const app: Application = express();

app.use(routes);

const server = createServer(app);

socket(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
