const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, "Le nom de l'utilisateur est requis"],
        unique: true,
        lowercase: true,
    },
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Le numéro du catway est requis']
    },

    boatName: {
        type: String,
        trim: true,
        required: [true, 'Le nom du bateau est requis'],
    },
    reservationStart: {
        type: Date,
        trim: true,
    }, 
    reservationEnd: {
        type: Date,
        trim: true,
    },
}, {
    // Ajout des timestamps (createdAt, updatedAt)
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);