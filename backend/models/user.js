
//// MODELE D'UN UTILISATEUR ////

const mongoose = require('mongoose');

/* outil de vérification de doublon */
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
/* Vérification d'un doublon dans la DB (au cas où l'adresse email ait déjà été utilisée) */
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);