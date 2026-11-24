import express from "express";
import { activateRefugee, createRefugee, deactivateRefugee, getActiveRefugees, getAllRefugees, getInactiveRefugees, getRefugeeById, updateRefugee } from "../controllers/refugeeController.js";
const router = express.Router();

// POST : enregistrer un nouveau réfugié
router.post("/", createRefugee);
// GET : récupérer tous les réfugiés
router.get("/", getAllRefugees);
// Récupérer les réfugiés actifs
router.get("/active", getActiveRefugees);
// Récupérer les réfugiés inactifs
router.get("/inactive", getInactiveRefugees);
// GET : récupérer un réfugié par son ID
router.get("/:id", getRefugeeById);
// PUT : modifier les informations d'un réfugié
router.put("/:id", updateRefugee);
// PATCH: desactiver un dossier refugie
router.patch("/:id/deactivate", deactivateRefugee);
// PATCH: desactiver un dossier refugie
router.patch("/:id/activate", activateRefugee);

export default router;