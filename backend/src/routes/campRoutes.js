import express from "express";
import { activateCamp, createCamp, deactivateCamp, deleteCamp, getActiveCamps, getAllCamps, getCampById, getInactiveCamps, updateCamp } from "../controllers/campController.js";

const router = express.Router();

// Route POST pour créer un camp
router.post("/", createCamp);
// GET: recuperer tout les camps
router.get("/", getAllCamps);
// GET : récupérer uniquement les camps actifs
router.get("/active", getActiveCamps);
// GET : récupérer uniquement les camps désactivés
router.get("/inactive", getInactiveCamps);
// GET : récupérer un camp par son ID
router.get("/:id", getCampById);
// PUT : modifier un camp
router.put("/:id", updateCamp);
// DELETE : supprimer un camp
router.delete("/:id", deleteCamp);
// PATCH : désactiver un camp.                    pourquoi PATCH? par ce que nous modifions une propriete du camp(isActive), et non l'ensemble de ses informations.
router.patch("/:id/deactivate", deactivateCamp);
// PATCH : réactiver un camp
router.patch("/:id/activate", activateCamp);

export default router;