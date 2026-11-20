
import mongoose from "mongoose";

// Définition du schéma d'un réfugié
const refugeeSchema = new mongoose.Schema({

    // Identifiant officiel figurant sur la carte de réfugié
    officialId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Nom complet du réfugié
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 150
    },

    // Camp dans lequel le réfugié réside
    camp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camp",
        required: true
    },

    // Indique si le dossier est actif dans la plateforme
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    // Création automatique de createdAt et updatedAt
    timestamps: true
});

// Création du modèle Refugee
const Refugee = mongoose.model("Refugee", refugeeSchema);

export default Refugee;
