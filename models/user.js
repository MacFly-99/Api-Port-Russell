const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import de bcrypt pour hacher les mots de passe
const bcrypt = require('bcrypt');

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },
    firstname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, "L'email est requis"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Le mot de passe est requis'],
    },
}, {
    // Ajout des timestamps (createdAt, updatedAt)
    timestamps: true
});

// Middleware qui sert à hacher le mot de passe quand il est modifié
User.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// Méthode pour comparer le mot de passe entré avec le mot de passe haché dans la base de données
User.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);