const User = require('../models/user');
const bcrypt = require('bcrypt');

// Callback pour créer,ajouter un nouvel utilisateur
exports.createUser = async (req, res, next) => {
  const userData = ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'user'
  });

  try {
    // Vérifier si l'email existe déjà
    const existing = await User.findOne({ userEmail: userData.email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(userData.password, 10);
    userData.password = hashed;

    let user = await User.create(userData);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

// Callback pour mettre à jour, modifier un utilisateur existant
exports.updateUser = async (req, res, next) => {
  const userName = req.params.name;
  const updateData = ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    let user = await User.updateOne({ userName }, updateData);
    if (user) {
      Object.keys(updateData).forEach((key) => {
        if (!updateData[key]) {
          delete updateData[key];
        }
        user[key] = updateData[key];
      });
      await user.save();
      return res.status(201).json(user);
    }
    return res.status(404).json({ message: 'User_not_found' });
  } catch (error) {
    return res.status(501).json(error);
  }
};

// Callback pour supprimer un utilisateur existant
exports.deleteUser = async (req, res, next) => {
  const userName = req.params.name;

  try {
    await User.deleteOne({ userName });
    return res.status(204).json({ message: 'User_deleted' });
  } catch (error) {
    return res.status(501).json(error);
  }
};

// Callback pour récupérer un utilisateur par son nom
exports.getByName = async (req, res, next) => {
  const userName = req.params.name;

  try {
    let user = await User.findOne({ userName });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User_not_found' });
  } catch (error) {
    return res.status(501).json(error);
  }
};

// Callback pour récupérer un utilisateur par son email
exports.getByEmail = async (req, res, next) => {
  const userEmail = req.params.email;

  try {
    let user = await User.findOne({ userEmail: userEmail.toLowerCase() });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User_not_found' });
  } catch (error) {
    return res.status(501).json(error);
  }
};

// Callback pour lister tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(501).json(error);
  }
};