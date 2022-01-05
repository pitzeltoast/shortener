"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scheme = new mongoose_1.default.Schema({
    short: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 15,
        validate: {
            validator: (value) => /^[a-zA-Z0-9]{1,15}$/.test(value),
            message: "invalid short",
        },
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(value),
            message: "invalid url",
        },
    },
});
exports.default = mongoose_1.default.model("link", scheme);
