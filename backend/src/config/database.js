// Importation du module DNS
import dns from "node:dns";

// Configuration des serveurs DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Importation de Mongoose
import mongoose from "mongoose";

// Importation des variables d'environnement
import { ENV } from "./env.js";

// Fonction de connexion à MongoDB
export const connectDB = async () => {
    try {
        // Connexion à MongoDB Atlas
        await mongoose.connect(ENV.MONGODB_URI);

        console.log("MongoDB connecté avec succès !");
        console.log(`Base de données : ${mongoose.connection.name}`);

    } catch (error) {

        console.error("Erreur de connexion MongoDB :", error.message);

        // Arrêt de l'application si la connexion échoue
        process.exit(1);
    }
};