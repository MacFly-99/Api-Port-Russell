// Callback pour créer , ajouter un nouveau catway
exports.createCatway = async (req, res, next) => {
    const catwayData = ({
        number: req.body.number,
        type: req.body.type,
        state: req.body.state
    });

    try {
        let catway = await Catway.create(catwayData);
        return res.status(201).json(catway);
    } catch (error) {
        return res.status(501).json(error);
    }
}


const Catway = require('../models/catway');

// Callback pour récupérer un catway par son numéro
exports.getByNumber = async (req, res, next) => {
    const catwayNumber = req.params.catwayNumber

    try {
        let catway = await Catway.findbyNumber(catwayNumber);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json({ message: 'Catway_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour récupérer un catway par son type
exports.getByType = async (req, res, next) => {
    const catwayType = req.params.catwayType

    try {
        let catway = await Catway.findByType(catwayType);
        
        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json({ message: 'Catway_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour récupérer un catway par son état
exports.getByState = async (req, res, next) => {
    const catwayState = req.params.catwayState

    try {
        let catway = await Catway.findByState(catwayState);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json({ message: 'Catway_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour lister tous les catways
exports.getAllCatways = async (req, res, next) => {
    try {
        let catways = await Catway.findAll();

        return res.status(200).json(catways);
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour mettre à jour , modifier un catway existant
exports.updateCatway = async (req, res, next) => {
    const catwayState = req.params.number;
    const updateData = ({
        state: req.body.state
    });

    try {
        let catway = await Catway.updateOne(catwayState, updateData);

        if (catway) {
            Object.keys(updateData).forEach((key) => {
                if (!!updateData[key]) {
                    catway[key] = updateData[key];
                }
            });

            await catway.save();
            return res.status(201).json(catway);
        }
        return res.status(404).json({ message: 'Catway_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour supprimer un catway existant
exports.deleteCatway = async (req, res, next) => {
    const catwayNumber = req.params.number;

    try {
        await Catway.deleteOne(catwayNumber);
        
        return res.status(204).json({ message: 'Catway_deleted' });
    } catch (error) {
        return res.status(501).json(error);
    }
}