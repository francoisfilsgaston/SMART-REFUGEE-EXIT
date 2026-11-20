// Importation de Mongoose
import mongoose from "mongoose";

// Définition de la structure d'un camp
const campSchema = new mongoose.Schema({

    // Nom du camp
    name: {
        type: String,
        required: true,
        trim: true
    },

    // Code unique du camp
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    // Province où se trouve le camp
    province: {
        type: String,
        required: true,
        trim: true
    },

    // Commune où se trouve le camp
    commune: {
        type: String,
        required: true,
        trim: true
    },

    // Localisation ou adresse complémentaire
    location: {
        type: String,
        trim: true,
        default: ""
    },

    // État du camp dans la plateforme
    isActive: {
        type: Boolean,
        default: true
    }

}, {

    // Ajout automatique de createdAt et updatedAt
    timestamps: true

});

// Création et exportation du modèle Camp
const Camp = mongoose.model("Camp", campSchema);

export default Camp;