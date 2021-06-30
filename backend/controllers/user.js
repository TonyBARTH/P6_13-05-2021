const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const md5 = require('crypto-js/md5');




//// INSCRIPTION NOUVEL UTILISATEUR ////
exports.signup = (req, res, next) => {
    /* Vérification de la force du mot de passe */
    var passwordValidator = require('password-validator');

    var passValidation = new passwordValidator();
    
    passValidation
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse', '123456']); // Blacklist these values

    var userPassTest = passValidation.validate(req.body.password);
    if (userPassTest == false) {
          console.log('La force du mot de passe est trop faible');
          return res.status(401).json({ error: 'Mot de passe trop faible' });
        }

    /* Cryptage mot de passe */
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
                
        /* Cryptage de l'email utilisateur en utilisant l'encryptage MD5 */
        var userEmail = req.body.email;
        var maskedEmail = md5(userEmail);

        /* Compilation des hash pour créer notre nouvel utilisateur */
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