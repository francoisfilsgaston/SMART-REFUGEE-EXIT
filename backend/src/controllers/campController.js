import { activateCampService, createCampService, deactivateCampService, deleteCampService, getActiveCampsService, getAllCampsService, getCampByIdService, getInactiveCampsService, updateCampService } from "../services/campService.js";

// Controller pour créer un camp
export const createCamp = async (req, res) => {

    try {
        // Récupérer les données envoyées par le client
        const campData = req.body;

        // Appeler le service
        const camp = await createCampService(campData);

        // Retourner la réponse au client
        return res.status(201).json({
            success: true,
            message: "Camp créé avec succès.",
            data: camp
        });

    } catch (error) {

        console.error("Erreur création camp :", error.message);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Controller pour récupérer tous les camps
export const getAllCamps = async (req, res) => {

    try {
        // Appeler le service
        const camps = await getAllCampsService();

        return res.status(200).json({
            success: true,
            message: "Liste des camps récupérée avec succès.",
            total: camps.length,
            data: camps
        });

    } catch (error) {

        console.error("Erreur récupération des camps :", error.message);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des camps."
        });
    }
};

//Controller pour Récupérer uniquement les camps actifs
export const getActiveCamps = async (req, res) => {
    try {
        const camps = await getActiveCampsService();

        return res.status(200).json({
            success: true,
            total: camps.length,
            data: camps
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Controller pour Récupérer uniquement les camps désactivés
export const getInactiveCamps = async (req, res) => {
    try {
        const camps = await getInactiveCampsService();

        return res.status(200).json({
            success: true,
            total: camps.length,
            data: camps
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Controller pour récupérer un camp par son ID
export const getCampById = async (req, res) => {

    try {
        // Récupérer l'ID envoyé dans l'URL
        const campId = req.params.id;

        // Appeler le service
        const camp = await getCampByIdService(campId);

        return res.status(200).json({
            success: true,
            message: "Camp récupéré avec succès.",
            data: camp
        });

    } catch (error) {

        console.error("Erreur récupération du camp :", error.message);

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Controller pour modifier un camp
export const updateCamp = async (req, res) => {

    try {
        // Récupérer l'ID depuis l'URL
        const { id } = req.params;

        // Récupérer les nouvelles données
        const campData = req.body;

        // Appeler le service
        const camp = await updateCampService(id, campData);

        return res.status(200).json({
            success: true,
            message: "Camp modifié avec succès.",
            data: camp
        });

    } catch (error) {

        console.error("Erreur modification camp :", error.message);

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Controller pour supprimer un camp
export const deleteCamp = async (req, res) => {

    try {
        // Récupérer l'ID depuis l'URL
        const { id } = req.params;

        // Appeler le service
        const camp = await deleteCampService(id);

        return res.status(200).json({
            success: true,
            message: "Camp supprimé avec succès.",
            data: camp
        });

    } catch (error) {

        console.error("Erreur suppression camp :", error.message);

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Controller pour désactiver un camp
export const deactivateCamp = async (req, res) => {

    try {
        const { id } = req.params;

        const camp = await deactivateCampService(id);

        return res.status(200).json({
            success: true,
            message: "Camp désactivé avec succès.",
            data: camp
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//Controller pour Réactiver un camp
export const activateCamp = async (req, res) => {
    try {
        const { id } = req.params;

        const camp = await activateCampService(id);

        return res.status(200).json({
            success: true,
            message: "Camp réactivé avec succès.",
            data: camp
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};