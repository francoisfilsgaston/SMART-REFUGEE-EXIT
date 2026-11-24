import express from "express";
import { createRefugee, getAllRefugees, getRefugeeById } from "../controllers/refugeeController.js";
const router = express.Router();

// POST : enregistrer un nouveau réfugié
router.post("/", createRefugee);
// GET : récupérer tous les réfugiés
router.get("/", getAllRefugees);
// GET : récupérer un réfugié par son ID
router.get("/:id", getRefugeeById);

export default router;