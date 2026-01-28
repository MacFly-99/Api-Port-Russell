/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification et gestion de session utilisateur
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Authentifie un utilisateur via email/mot de passe et retourne un token JWT + infos utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: vasilys@port-russell.fr
 *               password:
 *                 type: string
 *                 format: password
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [admin, user]
 *       400:
 *         description: Email ou mot de passe manquant
 *       401:
 *         description: Identifiants incorrects
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     description: Retourne les données de l'utilisateur actuellement authentifié (basé sur le token JWT)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [admin, user]
 *       401:
 *         description: Non authentifié ou token invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Déconnexion
 *     description: Indique au client de supprimer le token (pas d'action serveur)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout_successful
 */


const express = require('express');
const router = express.Router();
const private = require('../middlewares/private')

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Route pour la connexion d'un utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    // Recherche par email
    const user = await User.findOne({ userEmail: email.toLowerCase() }, '-__v -createdAt -updatedAt');

    if (user) {
      bcrypt.compare(password, user.userPassword, function(err, result) {
        if (err) {
          throw new Error('Login_failed');
        }

        if (result) {
          // Suppression du mot de passe avant envoi
          delete user._doc.userPassword;

          const expireIn = 24 * 60 * 60;
          const token = jwt.sign({
            userId: user._id,
            email: user.userEmail,
            name: user.userName || user.userEmail.split('@')[0],
            role: user.role || 'user'
          },
          process.env.SECRET_KEY,
          { expiresIn: expireIn });

          // On met le token dans le header
          res.header('Authorization', 'Bearer ' + token);

          // Réponse réussie avec token + user dans le body
          return res.status(200).json({
            message: 'Login_successful',
            token: token,
            user: {
              name: user.userName,
              email: user.userEmail,
              role: user.role || 'user'
            }
          });
        } else {
          return res.status(403).json({ message: 'Login_failed' });
        }
      });
    } else {
      return res.status(404).json({ message: 'User_not_found' });
    }
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour la déconnexion d'un utilisateur
router.get('/logout', (req, res) => {
  // Pour la déconnexion, il suffit de supprimer le token côté client
  return res.status(200).json({ message: 'Logout_successful' });
});

// Route pour récupérer l'utilisateur connecté (infos mises à jour)
router.get('/me', private.checkJWT, async (req, res) => {
  try {
    const user = await User.findByName(req.decoded.userId).select('-userPassword -__v');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    return res.status(200).json({
      name: user.userName,
      email: user.userEmail,
      role: user.role || 'user'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;