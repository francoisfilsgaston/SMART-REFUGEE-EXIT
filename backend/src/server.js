// Importation d'Express
import express from "express";

// Importation de la connexion MongoDB
import { connectDB } from "./config/database.js";

// Importation des variables d'environnement
import { ENV } from "./config/env.js";

// Création de l'application Express
const app = express();

// Middleware JSON
app.use(express.json());

// Route principale
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bienvenue sur l'API SMART REFUGEE EXIT",
        database: "MongoDB"
    });
});

// Fonction principale de démarrage
const startServer = async () => {
    // Connexion à MongoDB
    await connectDB();

    // Démarrage du serveur Express
    app.listen(ENV.PORT, () => {
        console.log(
            `Serveur démarré sur http://localhost:${ENV.PORT}`
        );
    });
};

// Exécution du démarrage
startServer();