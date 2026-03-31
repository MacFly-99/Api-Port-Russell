const Reservation = require('../models/Reservation');

exports.create = async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      catwayNumber: parseInt(req.params.id)
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllByCatway = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: parseInt(req.params.id) });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation || reservation.catwayNumber !== parseInt(req.params.id)) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      req.body,
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json({ message: 'Réservation supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};