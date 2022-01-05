import express from "express";
import { getJSON, redirect, newShort, deleteShort } from "../controllers/link";

const router = express.Router();

router.post("/", newShort);
router.route("/:short").get(redirect).delete(deleteShort);
router.route("/:short/json").get(getJSON);

export default router;
