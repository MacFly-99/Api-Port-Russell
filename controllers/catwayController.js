const Catway = require('../models/Catway');

exports.getAll = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: parseInt(req.params.id) });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.status(201).json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateState = async (req, res) => {
  try {
    const { catwayState } = req.body;
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: parseInt(req.params.id) },
      { catwayState },
      { new: true }
    );
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: parseInt(req.params.id) });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json({ message: 'Catway supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};