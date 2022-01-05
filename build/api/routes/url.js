"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const link_1 = require("../controllers/link");
const router = express_1.default.Router();
router.route("/:short").get(link_1.getRedirect);
router.route("/:short/json").get(link_1.getJSON);
exports.default = router;
