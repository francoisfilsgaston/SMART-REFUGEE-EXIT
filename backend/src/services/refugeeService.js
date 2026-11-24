import Refugee from "../models/Refugee.js";
import Camp from "../models/Camp.js";

//Service pour Enregistrer un nouveau réfugié
export const createRefugeeService = async (refugeeData) => {

    // 1. Vérifier si l'identifiant officiel existe déjà
    const existingRefugee = await Refugee.findOne({
        officialId: refugeeData.officialId
    });

    if (existingRefugee) {
        throw new Error("Cet identifiant officiel est déjà utilisé.");
    }

    // 2. Vérifier si le camp existe
    const existingCamp = await Camp.findById(refugeeData.camp);

    if (!existingCamp) {
        throw new Error("Le camp sélectionné n'existe pas.");
    }

    // 3. Vérifier si le camp est actif
    if (!existingCamp.isActive) {
        throw new Error("Impossible d'enregistrer un réfugié dans un camp désactivé.");
    }

    // 4. Créer le nouveau réfugié
    const newRefugee = await Refugee.create(refugeeData);

    // 5. Retourner le réfugié créé
    return newRefugee;
};