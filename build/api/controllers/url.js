"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSON = exports.getRedirect = void 0;
const codes = new Map(Object.entries({ parth: "https://parth.com", gogl: "https://google.com" }));
async function getURL(req) {
    const { short } = req.params;
    return new Promise((resolve) => {
        urlDB.findOne({ short }, (err, link) => {
            if (err) {
                resolve(null);
            }
            resolve(link.url);
        });
    });
}
async function getRedirect(req, res) {
    const url = await getURL(req);
    if (!url) {
        res.status(400).send("url not found");
        return;
    }
    res.redirect(url);
}
exports.getRedirect = getRedirect;
async function getJSON(req, res) {
    const url = await getURL(req);
    if (!url) {
        res.status(404).send({ error: { message: "url not found", code: 404 } });
        return;
    }
    res.json({ url });
}
exports.getJSON = getJSON;
