const { PassThrough } = require('stream');
const {storage} = require('../middlewares/files-storage');
const File = require('../models/file');
const fs = require('fs');

// Méthode chargée de créer un fichier
exports.createOneFile = (req, res, next) => {
    const file = new File({
        name: req.body.name,
        email: req.body.email,        
    });

    file.save()
    .then(() => { res.status(201).json({ message: 'File saved !' })})
    .catch(error => { res.status(400).json( { error })});
};

// Méthode chargée de récupérer un fichier
exports.getOneFile = (req, res, next) => {
    File.findOne({ name: req.params.name })
    .then(file => { res.status(200).json(file); })
    .catch(error => { res.status(404).json({ error }); });
};

// Méthode chargée de modifier un fichier
exports.modifyOneFile = (req, res, next) => {
    const file = new File({
        name: req.body.name,
        email: req.body.email,
    });

    File.findOne({ name: req.params.name })
    .then((thing) => {
        if (file.userName == thing.userName) {
            File.updateOne({ name: req.params.name }, { ...file, name: req.params.name })
            .then(() => res.status(200).json({ message: 'File updated !'}))
            .catch(error => res.status(401).json( { error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
};

// Méthode chargée de supprimer un fichier
exports.deleteOneFile = (req, res, next) => {
    File.findOne({ name: req.body.name })
    .then(file => {
        const filename = file.userUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, () => {
            File.deleteOne({ name: req.body.name })
            .then(() => { res.status(200).json({ message: 'File deleted !'})})
            .catch(error => res.status(401).json({ error }));
        });
    })
    .catch(error => {
        res.status(500).json({ error });
    });
};