const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Le numéro du catway est requis']
    },
    catwayType: {
        type: Boolean,
        trim: true,
    },
    catwayState: {
        type: String,
        trim: true,
    },
}, {
    // Ajout des timestamps (createdAt, updatedAt)
    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);