import express, { Application } from "express";

const app: Application = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
