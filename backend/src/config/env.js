// Chargement des variables du fichier .env
import dotenv from "dotenv";

// Validation des variables avec Zod
import { z } from "zod";

// Lecture du fichier .env
dotenv.config();

// Définition des variables obligatoires
const envSchema = z.object({
    PORT: z.coerce.number().default(5000),

    MONGODB_URI: z.string().min(1, {
        message: "MONGODB_URI est obligatoire"
    }),

    NODE_ENV: z.enum([
        "development",
        "production",
        "test"
    ]).default("development")
});

// Vérification des variables
const result = envSchema.safeParse(process.env);

// Arrêt de l'application si une variable est incorrecte
if (!result.success) {
    console.error("Erreur de configuration :", result.error.format());
    process.exit(1);
}

// Exportation des variables validées
export const ENV = result.data;