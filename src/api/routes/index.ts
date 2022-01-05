import express from "express";
import urlRoutes from "./link";

const router = express.Router();

router.get("/status", (_, res) => res.json({ status: "ok" }));

router.use("/", urlRoutes);

export default router;
