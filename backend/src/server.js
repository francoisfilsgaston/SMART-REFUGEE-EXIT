
import app from "./app.js";
import { connectDB } from "./config/database.js";
import { ENV } from "./config/env.js";

// Démarrer le serveur
const startServer = async () => {
    try {
        // 1. Connecter MongoDB
        await connectDB();

        // 2. Démarrer Express
        app.listen(ENV.PORT, () => {
            console.log(
                `Serveur démarré sur http://localhost:${ENV.PORT}`
            );
        });

    } catch (error) {
        console.error("Erreur au démarrage :", error.message);
        process.exit(1);
    }
};

startServer();
