// Callback pour créer, ajouter une réservation
exports.createReservation = async (req, res, next) => {
    const reservationData = ({
        userName: req.body.userName,
        catwayNumber: req.body.catwayNumber,
        boatName: req.body.boatName,
        reservationStart: req.body.reservationStart,
        reservationEnd: req.body.reservationEnd
    });

    try {
        let reservation = await Reservation.create(reservationData);
        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(501).json(error);
    }
}


const Reservation = require('../models/reservation');

// Callback pour récupérer une réservation par le nom de l'utilisateur
exports.getByUserName = async (req, res, next) => {
    const userName = req.params.userName

    try {
        let reservation = await Reservation.findByUserName(userName);

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json({ message: 'Reservation_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour récupérer une réservation par le numéro de catway
exports.getByCatwayNumber = async (req, res, next) => {
    const catwayNumber = req.params.catwayNumber

    try {
        let reservation = await Reservation.findByCatwayNumber(catwayNumber);

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json({ message: 'Reservation_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour récupérer une réservation par le nom du bateau
exports.getByBoatName = async (req, res, next) => {
    const boatName = req.params.boatName

    try {
        let reservation = await Reservation.findByBoatName(boatName);

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json({ message: 'Reservation_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour lister toutes les réservations
exports.getAllReservations = async (req, res, next) => {
    try {
        let reservations = await Reservation.findAll();
        
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour mettre à jour, modifier une réservation existante
exports.updateReservation = async (req, res, next) => {
    const reservationName = req.params.name;

    const reservationData = ({
        userName: req.body.userName,
        catwayNumber: req.body.catwayNumber,
        boatName: req.body.boatName,
        reservationStart: req.body.reservationStart,
        reservationEnd: req.body.reservationEnd
    });

    try {
        let reservation = await Reservation.updateOne(reservationName, reservationData);

        if (reservation) {
            Object.keys(reservationData).forEach((key) => {
                if (!!reservationData[key]) {
                    reservation[key] = reservationData[key];
                }
            });

            await reservation.save();
            return res.status(201).json(reservation);
        }
        return res.status(404).json({ message: 'Reservation_not_found' });
    } catch (error) {
        return res.status(501).json(error);
    }
}

// Callback pour supprimer une réservation existante
exports.deleteReservation = async (req, res, next) => {
    const reservationName = req.params.name;

    try {
        await Reservation.deleteOne(reservationName);

        return res.status(204).json({ message: 'Reservation_deleted' });
    } catch (error) {
        return res.status(501).json(error);
    }
}