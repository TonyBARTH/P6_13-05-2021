
//// MOTEUR APPLICATION BACKEND ////

/* Importation des modules */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const helmet = require("helmet");


/* Protection "BruteForce" avec le module Express Rate Limit */
const rateLimit = require("express-rate-limit");

const reqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 50,   // limit each IP to 50 requests per windowMs
  message: 'Trop de requêtes envoyées. Vous êtes bloqué pendant quelques minutes.'
});



/* Appel de Dotenv pour sécuriser la connexion à la DB en dissimulé */
const dotenv = require('dotenv').config();

/* Importation de Node Path pour donner accès au système de fichier (on s'en sert pour enregistrer nos images dans le dossier 'images' */
const path = require('path');

/* Importation des routes */
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');



/* Connexion à la base de données MongoDB (en utilisant Dotenv pour dissimuler l'url de connexion et les identifiants) */
mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/* Headers pour requêtes API */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* Chargement des modules complémentaires */
app.use(bodyParser.json());
app.use(helmet());

/* Indication des routes à suivre */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/', reqLimiter);


module.exports = app;