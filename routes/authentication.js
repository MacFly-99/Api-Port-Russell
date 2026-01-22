const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    // Recherche par email
    const user = await User.findOne({ userEmail: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Génération du token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.userEmail,
        name: user.userName,
        role: user.role || 'user'
      },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Réponse réussie
    res.json({
      token,
      user: {
        name: user.userName,
        email: user.userEmail,
        role: user.role || 'user'
      }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;