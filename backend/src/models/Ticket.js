import mongoose from "mongoose";

// Les différents statuts possibles d'un ticket
export const TICKET_STATUS = {
    ACTIVE: "ACTIVE",
    EXPIRED: "EXPIRED",
    REVOKED: "REVOKED"
};

const allowedTicketStatuses = Object.values(TICKET_STATUS);

// Définition du schéma Ticket
const ticketSchema = new mongoose.Schema({

    // Demande ayant donné naissance au ticket
    exitRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExitRequest",
        required: true,
        unique: true
    },

    // Numéro unique du ticket
    ticketNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Empreinte du jeton utilisé pour vérifier le QR code
    qrTokenHash: {
        type: String,
        required: true,
        select: false
    },

    // Agent ayant délivré le ticket
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Date de délivrance
    issuedAt: {
        type: Date,
        default: Date.now
    },

    // Date à partir de laquelle le ticket est valide
    validFrom: {
        type: Date,
        required: true
    },

    // Date d'expiration
    expiresAt: {
        type: Date,
        required: true
    },

    // Statut du ticket
    status: {
        type: String,
        enum: allowedTicketStatuses,
        default: TICKET_STATUS.ACTIVE
    },

    // Date d'une éventuelle révocation
    revokedAt: {
        type: Date,
        default: null
    },

    // Motif d'une éventuelle révocation
    revocationReason: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    }

}, {
    timestamps: true
});

// Vérification des dates
ticketSchema.pre("validate", function () {

    if (
        this.validFrom &&
        this.expiresAt &&
        this.expiresAt <= this.validFrom
    ) {
        this.invalidate(
            "expiresAt",
            "La date d'expiration doit être après la date de début de validité."
        );
    }

});

// Création du modèle
const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;