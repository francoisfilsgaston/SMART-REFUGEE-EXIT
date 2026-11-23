
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import campRoutes from "./routes/campRoutes.js";

const app = express();

// ==========================================
// 1. CONFIGURATION DES MIDDLEWARES DE SECURITE
// ==========================================

// Protège certaines informations des réponses HTTP
app.use(helmet());

// Autorise les requêtes provenant du frontend
app.use(cors({
    origin: "http://localhost:5173"
}));

// Limite le nombre de requêtes pour réduire les abus
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Trop de requêtes. Réessayez plus tard."
    }
});

app.use("/api", limiter);

// ==========================================
// 2. MIDDLEWARES GENERAUX
// ==========================================

app.use(express.json());

// ==========================================
// 3. ROUTES DE L'APPLICATION
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bienvenue sur l'API SMART REFUGEE EXIT"
    });
});

app.use("/api/camps", campRoutes);

// ==========================================
// 4. ROUTE INCONNUE
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route introuvable."
    });
});

export default app;
