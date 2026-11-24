import { activateRefugeeService, createRefugeeService, deactivateRefugeeService, getActiveRefugeesService, getAllRefugeesService, getInactiveRefugeesService, getRefugeeByIdService, updateRefugeeService } from "../services/refugeeService.js";

// Enregistrer un nouveau réfugié
export const createRefugee = async (req, res) => {
    try {

        // Récupérer les données envoyées par le client
        const refugeeData = req.body;

        // Appeler le service pour enregistrer le réfugié
        const newRefugee = await createRefugeeService(refugeeData);

        // Retourner une réponse au client
        return res.status(201).json({
            success: true,
            message: "Réfugié enregistré avec succès.",
            data: newRefugee
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

//Controller pour Récupérer tous les réfugiés
export const getAllRefugees = async (req, res) => {
    try {

        const refugees = await getAllRefugeesService();

        return res.status(200).json({
            success: true,
            total: refugees.length,
            data: refugees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//Controller pour Récupérer un réfugié par son ID
export const getRefugeeById = async (req, res) => {
    try {

        // Récupérer l'ID depuis l'URL
        const { id } = req.params;

        // Appeler le service
        const refugee = await getRefugeeByIdService(id);

        return res.status(200).json({
            success: true,
            data: refugee
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

//Controller pour Modifier les informations d'un réfugié
export const updateRefugee = async (req, res) => {
    try {

        // Récupérer l'identifiant depuis l'URL
        const { id } = req.params;

        // Récupérer les nouvelles données
        const refugeeData = req.body;

        // Appeler le service
        const updatedRefugee = await updateRefugeeService(
            id,
            refugeeData
        );

        return res.status(200).json({
            success: true,
            message: "Informations du réfugié modifiées avec succès.",
            data: updatedRefugee
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

//Controller pour Désactiver un dossier de réfugié
export const deactivateRefugee = async (req, res) => {
    try {
        const refugee = await deactivateRefugeeService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Le dossier du réfugié a été désactivé avec succès.",
            data: refugee
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//Controller pour Réactiver un dossier de réfugié
export const activateRefugee = async (req, res) => {
    try {
        const refugee = await activateRefugeeService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Le dossier du réfugié a été réactivé avec succès.",
            data: refugee
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//Controller pour Récupérer les réfugiés actifs
export const getActiveRefugees = async (req, res) => {
    try {
        const refugees = await getActiveRefugeesService();

        res.status(200).json({
            success: true,
            count: refugees.length,
            data: refugees
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Controller pour Récupérer les réfugiés inactifs
export const getInactiveRefugees = async (req, res) => {
    try {
        const refugees = await getInactiveRefugeesService();

        res.status(200).json({
            success: true,
            count: refugees.length,
            data: refugees
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};