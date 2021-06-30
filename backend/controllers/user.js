const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const md5 = require('crypto-js/md5');




//// INSCRIPTION NOUVEL UTILISATEUR ////
exports.signup = (req, res, next) => {
    /* Cryptage mot de passe */
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        var userEmail = req.body.email;
        
        console.log(md5(userEmail).toString());

        var maskedEmail = md5(userEmail);

        const user = new User({
          email: maskedEmail,
          password: hash
        });
        /* Enregistrement de l'utilisateur */
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

//// CONNEXION UTILISATEUR ////
exports.login = (req, res, next) => {
  let toto = md5(req.body.email);
  console.log(toto.toString());
    User.findOne({ email: md5(req.body.email).toString() }) 
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        /* Vérification du mot de passe */
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'bR.?t$X?rf}n1voW:0eaX?F|H}wOG&nC',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};