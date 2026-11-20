\import mongoose from "mongoose";

// Types de notifications
export const NOTIFICATION_TYPES = {
    REQUEST_SUBMITTED: "REQUEST_SUBMITTED",
    REQUEST_APPROVED: "REQUEST_APPROVED",
    REQUEST_REJECTED: "REQUEST_REJECTED",
    TICKET_ISSUED: "TICKET_ISSUED",
    TICKET_EXPIRING: "TICKET_EXPIRING",
    RENEWAL_APPROVED: "RENEWAL_APPROVED",
    RENEWAL_REJECTED: "RENEWAL_REJECTED",
    NEW_REQUEST_RECEIVED: "NEW_REQUEST_RECEIVED"
};

const allowedTypes = Object.values(NOTIFICATION_TYPES);

// Schéma d'une notification
const notificationSchema = new mongoose.Schema({

    // Utilisateur destinataire, si la notification lui est destinée
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Identifiant du réfugié destinataire, si applicable
    refugee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Refugee",
        default: null
    },

    // Type de notification
    type: {
        type: String,
        enum: allowedTypes,
        required: true
    },

    // Titre de la notification
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    // Contenu de la notification
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },

    // Ressource concernée
    resourceType: {
        type: String,
        default: null
    },

    // Identifiant de la ressource concernée
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    // Indique si la notification a été lue
    isRead: {
        type: Boolean,
        default: false
    },

    // Date de lecture
    readAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

// Création du modèle
const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

export default Notification;