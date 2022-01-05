"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor(prefix) {
        this.prefix = prefix || "LOG";
    }
    log(text) {
        console.log(`[${this.prefix}]`, chalk_1.default.white(text));
    }
    green(text) {
        console.log(`[${this.prefix}]`, chalk_1.default.green(text));
    }
    red(text) {
        console.log(`[${this.prefix}]`, chalk_1.default.red(text));
    }
    yellow(text) {
        console.log(`[${this.prefix}]`, chalk_1.default.yellow(text));
    }
}
exports.default = Logger;
