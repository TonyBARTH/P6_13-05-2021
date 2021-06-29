
//// MODELE D'UN UTILISATEUR ////

const mongoose = require('mongoose');

/* Outil de vérification de doublon */
const uniqueValidator = require('mongoose-unique-validator');

/* Outil de validation de mot de passe "fort" */
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


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, passValidation }
});
/* Vérification d'un doublon dans la DB (au cas où l'adresse email ait déjà été utilisée) */
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);