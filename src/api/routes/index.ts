import express from "express";
import linkRoutes from "./link";

const router = express.Router();

router.get("/status", (_, res) => res.json({ status: "ok" }));

router.use("/", linkRoutes);

export default router;
