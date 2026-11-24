import { createRefugeeService } from "../services/refugeeService.js";

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