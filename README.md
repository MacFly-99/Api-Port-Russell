# 🚤 Port Russell - Gestion de la Capitainerie

Application de gestion du port de plaisance de Russell (projet CEF - Centre Européen de Formation).

**API REST privée** construite avec **Node.js + Express + MongoDB** et un **frontend simple en HTML/CSS/JS** (vanilla) pour gérer les catways, les réservations et les utilisateurs.

## ✨ Fonctionnalités

- **Authentification** : Inscription / Connexion avec JWT (Bearer Token)
- **CRUD complet** pour :
  - Catways (numéro, type long/short, état)
  - Réservations (par catway : client, bateau, dates)
  - Utilisateurs (création, modification y compris mot de passe, suppression)
- **Tableau de bord** avec :
  - Nom de l'utilisateur connecté
  - Date du jour
  - Accès rapide aux différentes sections
- **Navbar commune** sur toutes les pages (navigation + déconnexion)
- **Documentation interactive** de l'API avec **Swagger**
- Interface moderne et responsive (styles unifiés)

## 🛠 Technologies utilisées

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) pour l'authentification
- bcrypt pour le hash des mots de passe
- Swagger (swagger-jsdoc + swagger-ui-express)

**Frontend**
- HTML5 / CSS3 (vanilla)
- JavaScript (fetch API)
- Modals pour création / modification

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- Git

## 🚀 Installation et lancement en local

1. **Clone le repository**
   ```bash
   git clone https://github.com/ton-username/port-russell.git
   cd port-russell

## Installation des dépendances

npm install

## Configuration des variables d'environnement

Dans le fichier .env à la racine du projet

## Lancer le serveur

npm start
# ou en développement :
npm run dev

## Accéder à l'application

- Application : http://localhost:3000
- Documentation API : http://localhost:3000/api-docs

## Structure du projet

port-russell/
├── controllers/          # Logique métier (auth, catways, reservations, users)
├── models/               # Schémas Mongoose (User, Catway, Reservation)
├── routes/               # Routes API (auth.js, catways.js, etc.)
├── middleware/           # Authentification JWT
├── public/               # Frontend statique
│   ├── index.html        
│   ├── login.html
│   ├── dashboard.html
│   ├── catways.html
│   ├── reservations.html
│   ├── users.html
│   ├── navbar.html
│   └── styles.css
├── server.js             # Point d'entrée de l'application
├── swagger.js            # Configuration Swagger
├── .env                  # Variables d'environnement (non commité)
└── README.md             # Informations complètes concernant l'application

## Identifiants de test

- Utilisateur : capitaine@russell.com
- Mot de passe : 654321

## Documentation de l'API

La documentation interactive est disponible à l'adresse /api-docs une fois le serveur lancé.
Toutes les routes sont documentées avec exemples de requêtes et réponses.

## Fonctionnalités du frontend

- Connexion / Déconnexion sécurisée
- Gestion complète des Catways (liste, création, modification d'état)
- Gestion des Réservations (par catway)
- Gestion des Utilisateurs (création, modification du mot de passe, suppression)
- Date du jour et nom de l'utilisateur connecté affichés sur toutes les pages

## Déploiement

L'application est prête pour le déploiement (Render, Railway, Cyclic, etc.).
Variables d'environnement à configurer sur la plateforme :

- MONGO_URI
- JWT_SECRET

Le frontend est servi statiquement depuis le dossier /public.