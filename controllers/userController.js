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
    const { email } = req.params;
    const { oldPassword, password, ...updateData } = req.body;  // On récupère oldPassword et le nouveau password

    // Si on veut changer le mot de passe, on vérifie l'ancien
    if (password) {
      if (!oldPassword) {
        return res.status(400).json({ message: "L'ancien mot de passe est requis pour en définir un nouveau." });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Vérification de l'ancien mot de passe
      const isMatch = await user.comparePassword(oldPassword);

      if (!isMatch) {
        return res.status(401).json({ message: "L'ancien mot de passe est incorrect." });
      }

      // Hash du nouveau mot de passe avant sauvegarde
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Mise à jour des autres champs + password (si fourni et vérifié)
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(updatedUser);
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