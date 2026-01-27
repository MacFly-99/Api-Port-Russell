# Frontend – Application Port-Russell

Interface utilisateur complète pour la gestion du port de plaisance.

## Technologies

- React 18
- React Router v6
- Bootstrap 5
- Fetch pour les appels API

## Structure du projet

application/
├── public/
│   └── index.html

├── src/
│   ├── components/
│   │   ├── Navbar.jsx           → Barre de navigation
│   │   ├── Layout.jsx           → Wrapper navbar + contenu
|
│   ├── datas/
│   │   ├── catways.json         → Fichier fourni avec le brief
│   │   ├── reservations.json    → Fichier fourni avec le brief
|
│   ├── protection/
│   │   └── Authentication.jsx   → Gestion auth globale
│   │   └── ProtectedRoute.jsx   → Protection des routes privées
|
│   ├── pages/
│   │   ├── Home.jsx             → Page d'accueil non connecté
│   │   ├── Login.jsx            → Connexion
│   │   ├── Dashboard.jsx        → Accueil connecté
│   │   ├── UsersList.jsx        → Liste + gestion utilisateurs (admin)
│   │   ├── CatwaysList.jsx      → Liste catways
│   │   ├── ReservationsList.jsx → Liste réservations
│   │   └── ... (détails, formulaires, etc.)
│   │   ├── NotFound.jsx         → Page d'erreur

│   ├── utils/
│   │   ├── jwt.js               → Décodage du token
|
│   ├── App.js                   → Routes + Router
│   └── index.js                 → Point d’entrée React
│   ├── App.css                  → CSS de base
│   ├── index.css                → CSS de base
|
└── package.json                 → Gestion des paquets
└── package-lock.json            
└── frontend-README.md           → Documentation sur le côté frontend de l'application (côté client)


## Fonctionnalités principales

- Connexion sécurisée avec JWT
- Navbar dynamique : liens adaptés au rôle (admin → Gestion utilisateurs)
- Affichage rôle ("Admin" en jaune, "Utilisateur" en bleu)
- Protection des routes (redirect vers login si non connecté)
- Gestion erreurs : Messages clairs
- Responsive (Bootstrap)


## Fonctionnalités principales

- Connexion sécurisée avec JWT
- Navbar dynamique : liens adaptés au rôle (admin → Gestion utilisateurs)
- Affichage rôle ("Admin" en jaune, "Utilisateur" en bleu)
- Protection des routes (redirect vers login si non connecté)
- Gestion erreurs : Alert Bootstrap + messages clairs
- Responsive (Bootstrap)

## Lancement

```bash
cd application
npm install
npm start

Le serveur écoute sur : http://localhost:3000


Flux utilisateur :

Page d’accueil → redirection vers /login si non connecté
Connexion → stockage token → dashboard
Dashboard → navbar avec rôle + liens
User normal : Dashboard | Catways | Réservations | Déconnexion
Admin :  Gestion Utilisateurs en +

Déconnexion → suppression token → retour /login


Identifiants de test recommandés :

Admin : vasilys@port-russell.fr / motdepasse123
User : test@exemple.com / test123