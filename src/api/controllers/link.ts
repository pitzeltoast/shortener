import { Request, Response } from "express";
import linkDB from "../../database/models/link";
import Logger from "../../utils/logger";
const logger = new Logger("LINK CTRL");

async function getURL(req: Request): Promise<string | null> {
  const { short } = req.params;
  return new Promise((resolve) => {
    linkDB.findOne(
      { short },
      (err: any, link: { short: string; url: string }) => {
        if (err || !link) {
          return resolve(null);
        }
        resolve(link.url);
      }
    );
  });
}

export async function redirect(req: Request, res: Response) {
  const url = await getURL(req);
  if (!url) {
    return res.status(404).send("url not found");
  }
  res.redirect(url);
}
export async function getJSON(req: Request, res: Response) {
  const url = await getURL(req);
  if (!url) {
    return res
      .status(404)
      .send({ error: { message: "url not found", code: 404 } });
  }
  res.json({ url });
}
export async function newShort(req: Request, res: Response) {
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
  linkDB.findOneAndUpdate(
    { short },
    { short, url },
    { upsert: true, runValidators: true },
    (err, upserted) => {
      if (err) {
        return res.status(400).json({
          error: { message: err.message, code: 500 },
        });
      }
      res.json({
        short,
        success: true,
        updated: upserted ? true : undefined,
      });
    }
  );
}
export async function deleteShort(req: Request, res: Response) {
  if (req.headers.authorization != process.env.TOKEN)
    return res.status(403).json({
      error: { message: "you do not have access to delete short urls" },
    });
  const { short } = req.params;
  linkDB.findOneAndDelete(
    { short },
    (err: any, link: { url: string; short: string }) => {
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
      res.json({ success: true });
    }
  );
}
