"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = new logger_1.default("DATABASE");
exports.default = new Promise((resolve) => {
    logger.yellow("Connecting to database...");
    mongoose_1.default.connect(process.env.MONGO_URI, (err) => {
        if (err) {
            logger.red(`Failed to connect to database: ${err.message}`);
            process.exit(1);
        }
        logger.green("Connected to database");
        resolve(1);
    });
});
