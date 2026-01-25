const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.decoded || !req.decoded.role) {
      return res.status(403).json({ message: 'Accès refusé - rôle manquant' });
    }

    if (req.decoded.role !== requiredRole) {
      return res.status(403).json({
        message: `Accès refusé - rôle requis : ${requiredRole}, votre rôle : ${req.decoded.role}`
      });
    }

    next();
  };
};

module.exports = authorizeRole;