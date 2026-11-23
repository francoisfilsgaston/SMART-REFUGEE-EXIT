import Camp from "../models/Camp.js";

// Service pour créer un camp
export const createCampService = async (campData) => {

    // 1. Vérifier si le code du camp existe déjà
    const existingCamp = await Camp.findOne({
        code: campData.code
    });

    if (existingCamp) {
        throw new Error("Ce code de camp existe déjà.");
    }

    // 2. Enregistrer le nouveau camp dans MongoDB
    const newCamp = await Camp.create(campData);

    // 3. Retourner le camp créé
    return newCamp;
};

// Service pour récupérer tous les camps
export const getAllCampsService = async () => {

    // Récupérer tous les camps dans MongoDB
    const camps = await Camp.find();

    return camps;
};

//Service pour Récupérer uniquement les camps actifs
export const getActiveCampsService = async () => {

    const camps = await Camp.find({
        isActive: true
    });

    return camps;
};

//Service pour Récupérer uniquement les camps désactivés
export const getInactiveCampsService = async () => {

    const camps = await Camp.find({
        isActive: false
    });

    return camps;
};

// Service pour récupérer un camp par son ID
export const getCampByIdService = async (campId) => {

    // Rechercher le camp dans MongoDB
    const camp = await Camp.findById(campId);

    // Vérifier si le camp existe
    if (!camp) {
        throw new Error("Camp introuvable.");
    }

    return camp;
};

// Service pour modifier un camp
export const updateCampService = async (campId, campData) => {

    // 1. Vérifier si le camp existe
    const existingCamp = await Camp.findById(campId);

    if (!existingCamp) {
        throw new Error("Camp introuvable.");
    }

    // 2. Modifier les informations du camp
    const updatedCamp = await Camp.findByIdAndUpdate(
        campId,                                     //Identifiant du camp à modifier  
        campData,                                   //Nouvelles données envoyées
        {
            new: true,                              //Retourner le document après modification plutot que son ancienne version.
            runValidators: true                     //Appliquer les validations du modèle
        }
    );

    // 3. Retourner le camp modifié
    return updatedCamp;
};


// Service pour supprimer un camp
export const deleteCampService = async (campId) => {

    // Rechercher et supprimer le camp
    const deletedCamp = await Camp.findByIdAndDelete(campId);

    // Vérifier si le camp existe
    if (!deletedCamp) {
        throw new Error("Camp introuvable.");
    }

    return deletedCamp;
};

// Service pour désactiver un camp
export const deactivateCampService = async (campId) => {

    const camp = await Camp.findById(campId);

    if (!camp) {
        throw new Error("Camp introuvable.");
    }

    if (!camp.isActive) {
        throw new Error("Ce camp est déjà désactivé.");
    }

    camp.isActive = false;

    await camp.save();

    return camp;
};

//Service pour Réactiver un camp
export const activateCampService = async (campId) => {

    // 1. Rechercher le camp dans MongoDB
    const camp = await Camp.findById(campId);

    // 2. Vérifier si le camp existe
    if (!camp) {
        throw new Error("Camp introuvable.");
    }

    // 3. Vérifier si le camp est déjà actif
    if (camp.isActive) {
        throw new Error("Ce camp est déjà actif.");
    }

    // 4. Modifier son état
    camp.isActive = true;

    // 5. Enregistrer la modification dans MongoDB
    await camp.save();

    return camp;
};
