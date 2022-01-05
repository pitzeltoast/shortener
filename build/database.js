"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const { DB_HOST, DB_USER, DB_PASS } = process.env;
const connection = mysql2_1.default.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: "shortener",
});
exports.default = connection;
