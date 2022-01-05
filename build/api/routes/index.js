"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const link_1 = __importDefault(require("./link"));
const router = express_1.default.Router();
router.get("/status", (_, res) => res.json({ status: "ok" }));
router.use("/", link_1.default);
exports.default = router;
