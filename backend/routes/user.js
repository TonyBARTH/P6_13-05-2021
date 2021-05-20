
//// ROUTES POUR UTILISATEUR ////

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

/* Chemin vers création d'un utilisateur */
router.post('/signup', userCtrl.signup);

/* Chemin pour identification d'un utilisateur */
router.post('/login', userCtrl.login);


module.exports = router;