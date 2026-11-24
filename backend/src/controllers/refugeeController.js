import { createRefugeeService, getAllRefugeesService, getRefugeeByIdService } from "../services/refugeeService.js";

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