
import mongoose from "mongoose";

// Types de documents acceptés par la plateforme
export const DOCUMENT_TYPES = {
    REFUGEE_CARD: "REFUGEE_CARD",
    STUDENT_CARD: "STUDENT_CARD",
    MEDICAL_CERTIFICATE: "MEDICAL_CERTIFICATE",
    INVITATION_LETTER: "INVITATION_LETTER",
    OTHER: "OTHER"
};

const allowedDocumentTypes = Object.values(DOCUMENT_TYPES);

// Schéma d'un document
const documentSchema = new mongoose.Schema({

    // Demande à laquelle le document appartient
    exitRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExitRequest",
        required: true
    },

    // Type de document
    documentType: {
        type: String,
        enum: allowedDocumentTypes,
        required: true
    },

    // Nom original du fichier(conserve le nom initial du fichier)
    originalName: {
        type: String,
        required: true,
        trim: true
    },

    // Référence privée vers le fichier stocké(conserve la reference privee permettant de retrouver le fichier)
    storageKey: {
        type: String,
        required: true,
        select: false
    },

    // Type MIME du fichier(indique le format du fichier, par exemple image/jpeg)
    mimeType: {
        type: String,
        required: true
    },

    // Taille du fichier en octets
    size: {
        type: Number,
        required: true,
        min: 1
    },

    // Agent ayant vérifié le document
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Résultat de la vérification(permet a l'agent de preciser si le document est encore a verifier, valide ou invalide)
    verificationStatus: {
        type: String,
        enum: ["PENDING", "VALID", "INVALID"],
        default: "PENDING"
    },

    // Commentaire de vérification
    verificationComment: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    }

}, {
    timestamps: true
});

// Création du modèle
const Document = mongoose.model("Document", documentSchema);

export default Document;
