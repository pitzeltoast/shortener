import mongoose from "mongoose";
import Logger from "../utils/logger";
const logger = new Logger("DATABASE");

export default new Promise((resolve) => {
  logger.yellow("Connecting to database...");
  mongoose.connect(process.env.MONGO_URI as string, (err) => {
    if (err) {
      logger.red(`Failed to connect to database: ${err.message}`);
      process.exit(1);
    }
    logger.green("Connected to database");
    resolve(1);
  });
});
