import mongoose from "mongoose";

// Types de bureaux proposés
export const OFFICE_TYPES = {
    CAMP_ADMINISTRATION: "CAMP_ADMINISTRATION",
    ONPRA: "ONPRA",
    OTHER_AUTHORIZED: "OTHER_AUTHORIZED"
};

const allowedOfficeTypes = Object.values(OFFICE_TYPES);

// Schéma d'un bureau
const officeSchema = new mongoose.Schema({

    // Nom du bureau
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    // Code unique du bureau
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    // Type de bureau
    type: {
        type: String,
        enum: allowedOfficeTypes,
        required: true
    },

    // Camp associé au bureau, si applicable
    camp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camp",
        default: null
    },

    // Province
    province: {
        type: String,
        required: true,
        trim: true
    },

    // Commune
    commune: {
        type: String,
        required: true,
        trim: true
    },

    // Adresse ou localisation détaillée
    address: {
        type: String,
        trim: true,
        default: ""
    },

    // Indique si le bureau est actif
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

// Création du modèle
const Office = mongoose.model("Office", officeSchema);

export default Office;