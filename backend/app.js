
//// MOTEUR APPLICATION BACKEND ////

/* Importation des modules */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

/* Importation des routes */
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');



/* Connexion à la base de données MongoDB */
mongoose.connect('mongodb+srv://TonyBARTH:GoodMorningMongo@cluster0.8pdxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

app.use(bodyParser.json());

/* Indication des routes à suivre */
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;