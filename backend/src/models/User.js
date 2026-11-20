
import mongoose from "mongoose";

// Définition des rôles autorisés
export const USER_ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",             //Administrateur general
    CAMP_ADMIN: "CAMP_ADMIN",               //Administrateur de camp
    RECEPTION_AGENT: "RECEPTION_AGENT",     //Agent d'accueil
    OFFICE_AGENT: "OFFICE_AGENT",           //Agent d'un bureau autorisé(ONPRA par exemple)
    CONTROL_AGENT: "CONTROL_AGENT"          //Agent de controle(Police dans la route par exemple)
};

// Récupération de toutes les valeurs des rôles
const allowedRoles = Object.values(USER_ROLES);

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({

    // Nom complet de l'utilisateur
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    // Adresse e-mail
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Mot de passe haché
    password: {
        type: String,
        required: true,
        select: false
    },

    // Rôle de l'utilisateur
    role: {
        type: String,
        enum: allowedRoles,
        required: true
    },

    // Camps auxquels l'utilisateur est affecté
    assignedCamps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camp"                                 //indique a Mongoose que ces identifiants font reference au modele camp.
    }],

    // Bureaux auxquels l'utilisateur est affecté
    assignedOffices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office"
    }],

    // Statut du compte
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

// Création du modèle User
const User = mongoose.model("User", userSchema);

export default User;
