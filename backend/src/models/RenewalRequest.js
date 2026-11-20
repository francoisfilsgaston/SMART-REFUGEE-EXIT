import mongoose from "mongoose";

// Statuts possibles d'une demande de prolongation
export const RENEWAL_STATUS = {
    PENDING: "PENDING",
    UNDER_REVIEW: "UNDER_REVIEW",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED"
};

const allowedStatuses = Object.values(RENEWAL_STATUS);

// Schéma d'une demande de prolongation
const renewalRequestSchema = new mongoose.Schema({

    // Ticket concerné par la prolongation
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },

    // Motif de la prolongation
    reason: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 500
    },

    // Date de retour actuellement autorisée
    currentExpiryDate: {
        type: Date,
        required: true
    },

    // Nouvelle date de retour souhaitée
    requestedExpiryDate: {
        type: Date,
        required: true
    },

    // Bureau chargé de traiter la demande
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office",
        required: true
    },

    // Agent qui traite la demande
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Statut de la demande
    status: {
        type: String,
        enum: allowedStatuses,
        default: RENEWAL_STATUS.PENDING
    },

    // Motif du refus
    rejectionReason: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    },

    // Date de traitement
    reviewedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

// Vérification de la nouvelle date souhaitée
renewalRequestSchema.pre("validate", function () {

    if (
        this.currentExpiryDate &&
        this.requestedExpiryDate &&
        this.requestedExpiryDate <= this.currentExpiryDate
    ) {
        this.invalidate(
            "requestedExpiryDate",
            "La nouvelle date doit être postérieure à la date d'expiration actuelle."
        );
    }

});

// Création du modèle
const RenewalRequest = mongoose.model(
    "RenewalRequest",
    renewalRequestSchema
);

export default RenewalRequest;