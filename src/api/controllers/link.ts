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

export async function getRedirect(req: Request, res: Response) {
  const url = await getURL(req);
  if (!url) {
    return res.status(400).send("url not found");
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
export async function newLink(req: Request, res: Response) {
  let { url, short } = req.body;
  short = short || Math.random().toString(36).substring(2, 8);
  if (req.headers.authorization != process.env.TOKEN)
    return res.status(403).json({
      error: { message: "you do not have access to make short urls" },
    });
  if (!url)
    return res
      .status(400)
      .json({ error: { message: "url not provided", code: 400 } });
  linkDB.findOne(
    { short },
    (err: any, link: { url: string; short: string }) => {
      if (link)
        return res
          .status(400)
          .json({ error: { message: "short already exists" } });
      const newLink = new linkDB({ url, short });
      newLink.save((err: any) => {
        if (err) {
          logger.red(err.stack || err);
          return res.status(500).json({
            error: { message: "error creating short link", code: 500 },
          });
        }
        logger.green(`generated ${short} for ${url}`);
        res.json({ short });
      });
    }
  );
}
