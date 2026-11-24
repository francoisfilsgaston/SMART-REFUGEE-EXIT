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

//Service pour Récupérer tous les réfugiés avec les informations de leur camp
export const getAllRefugeesService = async () => {

    const refugees = await Refugee.find().populate("camp", "name code province, commune");

    return refugees;
};

//Service pour Récupérer un réfugié par son ID avec les informations du camp
export const getRefugeeByIdService = async (refugeeId) => {

    // Rechercher le réfugié dans MongoDB
    const refugee = await Refugee.findById(refugeeId).populate("camp", "name code province commune")

    // Vérifier si le réfugié existe
    if (!refugee) {
        throw new Error("Réfugié introuvable.");
    }

    return refugee;
};

//Service pour Récupérer tous les réfugiés actifs
export const getActiveRefugeesService = async () => {
    const refugees = await Refugee.find({ isActive: true })
        .populate("camp", "name code province commune");

    return refugees;
};
//Service pour Récupérer tous les réfugiés inactifs
export const getInactiveRefugeesService = async () => {
    const refugees = await Refugee.find({ isActive: false })
        .populate("camp", "name code province commune");

    return refugees;
};

//Service pour Modifier les informations d'un réfugié
export const updateRefugeeService = async (refugeeId, refugeeData) => {

    // 1. Vérifier si le réfugié existe
    const existingRefugee = await Refugee.findById(refugeeId);

    if (!existingRefugee) {
        throw new Error("Réfugié introuvable.");
    }

    // 2. Si un nouvel identifiant officiel est fourni,
    // vérifier qu'il n'est pas déjà utilisé
    if (refugeeData.officialId) {

        const duplicateRefugee = await Refugee.findOne({
            officialId: refugeeData.officialId,
            _id: { $ne: refugeeId }                    //$ne: Signifie Not Equal, c'est a dire "different de"  : Recherche un autre réfugié possédant
        });                                            //cet identifiant officiel, mais ignore le réfugié que nous sommes en train de modifier.

        if (duplicateRefugee) {
            throw new Error("Cet identifiant officiel est déjà utilisé.");
        }
    }

    // 3. Si un nouveau camp est fourni, vérifier son existence et son état
    if (refugeeData.camp) {

        const existingCamp = await Camp.findById(refugeeData.camp);

        if (!existingCamp) {
            throw new Error("Le camp sélectionné n'existe pas.");
        }

        if (!existingCamp.isActive) {
            throw new Error("Impossible d'affecter le réfugié à un camp désactivé.");
        }
    }

    // 4. Modifier le réfugié
    const updatedRefugee = await Refugee.findByIdAndUpdate(
        refugeeId,
        refugeeData,
        {
            new: true,
            runValidators: true
        }
    ).populate("camp", "name code province commune");

    return updatedRefugee;
};

//Service pour Désactiver un dossier de réfugié
export const deactivateRefugeeService = async (refugeeId) => {

    // 1. Rechercher le réfugié
    const refugee = await Refugee.findById(refugeeId);

    if (!refugee) {
        throw new Error("Réfugié introuvable.");
    }

    // 2. Vérifier si son dossier est déjà désactivé
    if (!refugee.isActive) {
        throw new Error("Ce dossier est déjà désactivé.");
    }

    // 3. Désactiver le dossier
    refugee.isActive = false;

    // 4. Enregistrer la modification
    await refugee.save();

    return refugee;
};

//Service pour Réactiver un dossier de réfugié
export const activateRefugeeService = async (refugeeId) => {

    // 1. Rechercher le réfugié
    const refugee = await Refugee.findById(refugeeId);

    if (!refugee) {
        throw new Error("Réfugié introuvable.");
    }

    // 2. Vérifier si son dossier est déjà actif
    if (refugee.isActive) {
        throw new Error("Ce dossier est déjà actif.");
    }

    // 3. Réactiver le dossier
    refugee.isActive = true;

    // 4. Enregistrer la modification
    await refugee.save();

    return refugee;
};