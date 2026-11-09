// 1. Importation d'Express
import express from "express";

// 2. Création de l'application Express
const app = express();
// 3. Définition du port du serveur
const PORT = 5000;

// 4. Middleware pour recevoir les données JSON
app.use(express.json());

// 5. Première route de notre API
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bienvenue sur l'API SMART REFUGEE EXIT"
    });
});

// 6. Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});