
//// AUTHENTIFICATION UTILISATEUR ////

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    /* Récupération + vérification du token dans header */
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'bR.?t$X?rf}n1voW:0eaX?F|H}wOG&nC');
    const userId = decodedToken.userId;
    /* Vérification de l'identifiant */
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({error: new Error('Invalid request!')
    });
  }
};