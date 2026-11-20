import mongoose from "mongoose";

// Actions importantes enregistrées dans le système
export const AUDIT_ACTIONS = {
    USER_CREATED: "USER_CREATED",
    USER_UPDATED: "USER_UPDATED",
    REFUGEE_CREATED: "REFUGEE_CREATED",
    REQUEST_SUBMITTED: "REQUEST_SUBMITTED",
    REQUEST_APPROVED: "REQUEST_APPROVED",
    REQUEST_REJECTED: "REQUEST_REJECTED",
    TICKET_ISSUED: "TICKET_ISSUED",
    TICKET_REVOKED: "TICKET_REVOKED",
    RENEWAL_APPROVED: "RENEWAL_APPROVED",
    RENEWAL_REJECTED: "RENEWAL_REJECTED",
    DOCUMENT_VERIFIED: "DOCUMENT_VERIFIED",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
};

const allowedActions = Object.values(AUDIT_ACTIONS);

// Schéma du journal d'audit
const auditLogSchema = new mongoose.Schema({

    // Utilisateur ayant effectué l'action
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Action effectuée
    action: {
        type: String,
        enum: allowedActions,
        required: true
    },

    // Type de ressource concernée
    resourceType: {
        type: String,
        required: true,
        trim: true
    },

    // Identifiant de la ressource concernée
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    // Description complémentaire
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    },

    // Adresse IP de l'utilisateur, si disponible
    ipAddress: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

// Création du modèle
const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;