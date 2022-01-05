import express from "express";
import { getJSON, getRedirect, newLink } from "../controllers/link";

const router = express.Router();

router.post("/", newLink);
router.route("/:short").get(getRedirect);
router.route("/:short/json").get(getJSON);

export default router;
