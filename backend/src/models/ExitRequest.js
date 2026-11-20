
import mongoose from "mongoose";

// Les différents statuts possibles d'une demande
export const REQUEST_STATUS = {
    PENDING: "PENDING",
    UNDER_REVIEW: "UNDER_REVIEW",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED"
};

// Les valeurs autorisées pour le champ status
const allowedStatuses = Object.values(REQUEST_STATUS);

// Définition du schéma d'une demande de sortie
const exitRequestSchema = new mongoose.Schema({

    // Référence vers le réfugié qui effectue la demande
    refugee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Refugee",
        required: true
    },

    // Camp depuis lequel la demande est traitée
    camp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camp",
        required: true
    },

    // Motif de la sortie
    reason: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 500
    },

    // Destination souhaitée
    destination: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    // Date de départ souhaitée
    departureDate: {
        type: Date,
        required: true
    },

    // Date de retour souhaitée
    returnDate: {
        type: Date,
        required: true
    },

    // Statut actuel de la demande
    status: {
        type: String,
        enum: allowedStatuses,
        default: REQUEST_STATUS.PENDING
    },

    // Agent qui a pris la décision
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Motif du refus, si la demande est rejetée
    rejectionReason: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    },

    // Date à laquelle la décision a été prise
    reviewedAt: {
        type: Date,
        default: null
    }

}, {
    // Ajoute automatiquement createdAt et updatedAt
    timestamps: true
});

// Vérifier que la date de retour est après la date de départ
exitRequestSchema.pre("validate", function () {
    if (
        this.departureDate &&
        this.returnDate &&
        this.returnDate <= this.departureDate
    ) {
        this.invalidate(
            "returnDate",
            "La date de retour doit être après la date de départ."
        );
    }
});

// Création du modèle
const ExitRequest = mongoose.model(
    "ExitRequest",
    exitRequestSchema
);

export default ExitRequest;
