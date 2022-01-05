import express, { ErrorRequestHandler } from "express";
import parser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import Logger from "../utils/logger";
import connectDB from "../database/connect";
const logger = new Logger("MAIN");

const { PORT } = process.env;

const app = express();
app.use(parser.json({ limit: "1mb" }));
app.use(parser.urlencoded({ extended: true }));

app.use("/", routes);

app.get("/", (_, res) => {
  res.send("URL shortener thing");
});
app.use((_, res) => {
  res.status(404).send("Invalid URL");
});
const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  if (err.type == "entity.parse.failed") {
    return res
      .status(400)
      .json({ error: { message: "invalid body", code: 400 } });
  }
  res.status(500);
  logger.red(err.stack || err);
  res.send("Something went wrong");
};
app.use(errorHandler);
connectDB.then(() => {
  app.listen(PORT, () => {
    logger.green(`Server started on port ${PORT}`);
  });
});
