import mongoose from "mongoose";

// Schéma d'accès temporaire d'un réfugié
const refugeeAccessSchema = new mongoose.Schema({

    // Référence vers le réfugié concerné
    refugee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Refugee",
        required: true
    },

    // Demande à laquelle cet accès donne accès
    exitRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExitRequest",
        required: true
    },

    // Empreinte cryptographique du code secret
    accessTokenHash: {
        type: String,
        required: true,
        unique: true,
        select: false
    },

    // Date d'expiration de l'accès
    expiresAt: {
        type: Date,
        required: true
    },

    // Date de révocation éventuelle
    revokedAt: {
        type: Date,
        default: null
    },

    // Dernière utilisation de l'accès
    lastUsedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

// Index pour faciliter la recherche des accès liés à une demande
refugeeAccessSchema.index({
    exitRequest: 1
});

// Création du modèle
const RefugeeAccess = mongoose.model(
    "RefugeeAccess",
    refugeeAccessSchema
);

export default RefugeeAccess;