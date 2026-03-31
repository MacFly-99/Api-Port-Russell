const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Ne pas renvoyer les mots de passe
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    // On ne permet pas de modifier le mot de passe ici pour simplifier
    const { password, ...updateData } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      updateData,
      { new: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};