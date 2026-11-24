import express from "express";
import { createRefugee } from "../controllers/refugeeController.js";
const router = express.Router();

// POST : enregistrer un nouveau réfugié
router.post("/", createRefugee);

export default router;