"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShort = exports.newShort = exports.getJSON = exports.redirect = void 0;
const link_1 = __importDefault(require("../../database/models/link"));
const logger_1 = __importDefault(require("../../utils/logger"));
const logger = new logger_1.default("LINK CTRL");
async function getURL(req) {
    const { short } = req.params;
    return new Promise((resolve) => {
        link_1.default.findOne({ short }, (err, link) => {
            if (err || !link) {
                return resolve(null);
            }
            resolve(link.url);
        });
    });
}
async function redirect(req, res) {
    const url = await getURL(req);
    if (!url) {
        return res.status(404).send("url not found");
    }
    res.redirect(url);
}
exports.redirect = redirect;
async function getJSON(req, res) {
    const url = await getURL(req);
    if (!url) {
        return res
            .status(404)
            .send({ error: { message: "url not found", code: 404 } });
    }
    res.json({ url });
}
exports.getJSON = getJSON;
async function newShort(req, res) {
    if (req.headers.authorization != process.env.TOKEN)
        return res.status(403).json({
            error: { message: "you do not have access to make short urls" },
        });
    let { url, short } = req.body;
    short = short || Math.random().toString(36).substring(2, 8);
    if (!url)
        return res
            .status(400)
            .json({ error: { message: "url not provided", code: 400 } });
    link_1.default.findOneAndUpdate({ short }, { short, url }, { upsert: true, runValidators: true }, (err, upserted) => {
        if (err) {
            return res.status(400).json({
                error: { message: err.message, code: 500 },
            });
        }
        logger.green(`generated ${short} for ${url}`);
        res.json({
            short,
            success: true,
            updated: upserted ? true : undefined,
        });
    });
}
exports.newShort = newShort;
async function deleteShort(req, res) {
    if (req.headers.authorization != process.env.TOKEN)
        return res.status(403).json({
            error: { message: "you do not have access to delete short urls" },
        });
    const { short } = req.params;
    link_1.default.findOneAndDelete({ short }, (err, link) => {
        if (!link)
            return res
                .status(404)
                .json({ error: { message: "short does not exist" } });
        if (err) {
            logger.red(err.stack || err);
            return res.status(500).json({
                error: { message: "error deleting short link", code: 500 },
            });
        }
        logger.green(`deleted ${short}`);
        res.json({ success: true });
    });
}
exports.deleteShort = deleteShort;
