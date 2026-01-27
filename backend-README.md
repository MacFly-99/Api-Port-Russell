# API Port-Russell – Backend

Gestion complète du port de plaisance : utilisateurs, catways, réservations, authentification sécurisée.

## Technologies

- Node.js + Express
- MongoDB Atlas (via Mongoose)
- JWT pour l'authentification
- bcrypt pour le hashage des mots de passe
- CORS, cookie-parser, morgan (logs)

## Structure du projet

backend/
├── app.js                    → Point d'entrée + middlewares globaux
|
├── routes/
│   ├── authentication.js     → /login, /me, /logout
│   ├── users.js              → CRUD utilisateurs (admin only)
│   ├── catways.js            → CRUD catways (lecture, écriture admin)
│   └── reservations.js       → CRUD réservations (lecture, écriture admin)
│   └── files.js              → Routes pour gérer les fichiers en local
|
├── services/
│   └── users.js              → Gestion des utilisateurs
│   └── catways.js            → Gestion des catways
│   └── reservations.js       → Gestion des réservations
│   └── files.js              → Gestion des fichiers
|
├── middlewares/
│   ├── private.js            → checkJWT
│   └── roles.js              → Autorisation en fonction du rôle (authorizeRole)
│   └── files-storage.js      → Gestion des données dans les formulaires (multer)
|
├── models/
│   └── user.js               → Schéma Mongoose User
│   └── catway.js             → Schéma Mongoose Catway
│   └── reservation.js        → Schéma Mongoose Reservation
│   └── file.js               → Schéma Mongoose Fichier
|
├── db/
│   └── mongo.js              → Connexion MongoDB
|
├── .env                      → Variables d'environnement
└── package.json              → Gestion des paquets
└── package-lock.json
└── backend-README.md         → Documentation sur le côté backend de l'application (API)


## Installation & Lancement

1. Cloner le repo et aller dans le dossier backend
```bash
cd api-port-russell
npm install

## Créer le fichier .env à la racine

PORT=8080
SECRET_KEY=ta_clé_secrète_très_longue_et_complexe
URL_MONGO=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/port-russell?retryWrites=true&w=majority
NODE_ENV=development

## Lancer le serveur

npm start 
ou
nodemon app.js pour le développement

Le serveur écoute sur http://localhost:8080


Méthode,URL,Description,Auth,Rôle :

POST,/api/auth/login,Connexion → token + user,Public,—
GET,/api/auth/me,Infos utilisateur connecté,JWT,Tous
GET,/api/auth/logout,Déconnexion (côté client),Public,—


Méthode,URL,Description,AdminOnly :

GET,/users/all,Liste tous les utilisateurs
GET,/users/:name,Détail par nom
POST,/users/create,Créer un utilisateur
PATCH,/users/:name,Modifier un utilisateur
DELETE,/users/:name,Supprimer un utilisateur


Méthode,URL,Description,Rôle :

GET,/catways/all,Liste tous les catways,Tous
GET,/catways/:number,Détail d’un catway,Tous
POST,/catways/create,Créer un catway,Admin
DELETE,/catways/:number,Supprimer un catway,Admin


Méthode,URL,Description, :

GET,/reservations/all,Liste toutes les réservations,Admin
GET,/reservations/users/:name,Réservations d’un utilisateur,Tous
GET,/reservations/catways/:number,Réservations d’un catway,Tous
POST,/reservations/catways/:number,Créer une réservation,Admin
PATCH,/reservations/catways/:number,Modifier une réservation,Admin
DELETE,/reservations/catways/:number,Supprimer une réservation,Admin


Sécurité :

JWT Bearer Token obligatoire sur toutes les routes protégées
Vérification rôle via middleware authorizeRoles('admin')
Hashage bcrypt des mots de passe
Erreurs gérées globalement (401, 403, 404, 500) avec messages JSON clairs


Identifiants de test recommandés :

Admin : vasilys@port-russell.fr / motdepasse123
Utilisateur : test@exemple.com / test123