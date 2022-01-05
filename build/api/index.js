"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("../utils/logger"));
const connect_1 = __importDefault(require("../database/connect"));
const logger = new logger_1.default("MAIN");
const { PORT } = process.env;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "1mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.default);
app.get("/", (_, res) => {
    res.send("URL shortener thing");
});
app.use((_, res) => {
    res.status(400).send("Invalid URL");
});
const errorHandler = (err, _, res, __) => {
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
connect_1.default.then(() => {
    app.listen(PORT, () => {
        logger.green(`Server started on port ${PORT}`);
    });
});
