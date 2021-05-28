
//// LOGIQUE METIER (CONTROLLEURS) POUR LES SAUCES ////

/* Référence au modèle de construction des sauces */
const Sauce  = require('../models/sauce');

/* Utilisation du package FS (files system) de Node pour accès aux fichiers */
const fs = require('fs');
const sauce = require('../models/sauce');


//// AFFICHAGE DE TOUTES LES SAUCES ////

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


//// AFFICHAGE D'UNE SAUCE ////

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


//// CREATION SAUCE ////

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  /* On paramètre les compteurs de likes/dislikes à zéro par défaut */
  sauceObject.likes = 0;
  sauceObject.dislikes = 0;
  /* On supprime l'Id du produit car il y en a déjà un de généré par Mongo DB */
  delete req.body._id;
  /* Création et enregistrement d'une nouvelle sauce dans la DB */
  const sauce = new Sauce({
    ...sauceObject,
    usersLiked: [],
    usersDisliked: [],
    dislikes: 0,
    likes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};


//// MODIFICATION SAUCE ////

exports.modifySauce = (req, res, next) => {
  /* Utilisation de l'opérateur terner pour savoir si le produit existe déjà ou pas */
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  /* si le produit n'existe pas, on fait une copie du body de la requête */

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};


//// SUPPRESSION SAUCE ////

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//// LIKES / DISLIKES ////

exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  const sauceId = req.params.id;

/*Recherche de la sauce appropriée*/
  Sauce.findOne({ _id: sauceId })
    .then(sauce => {
      /* Récupération des champs de la DB */
      let likes = sauce.likes;
      let dislikes = sauce.dislikes;
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;
      
      /* Si l'utilisateur AIME la sauce... */
      if (like == 1) {
        /* Vérification de l'id de l'utilisateur dans le tableau des usersLiked */
        if (!usersLiked.includes(userId)) {
          /* On ajoute l'id de l'utilisateur dans le tableau */
          usersLiked.push(userId);
          /* On ajoute un like */
          likes++;
        }
        /* Si l'utilisateur N'AIME PAS la sauce */
      } else if (like == -1) {
        if (!usersDisliked.includes(userId)) {
          usersDisliked.push(userId);
          dislikes = dislikes + 1;
        }
      } else {
        /* Si l'utilisateur ENLEVE SON LIKE */
        if (usersLiked.includes(userId)) {
          var index = usersLiked.indexOf(userId);
          usersLiked.splice(index, 1);
          likes = likes - 1;
        }
         /* Si l'utilisateur ENLEVE SON DISLIKE */
        if (usersDisliked.includes(userId)) {
          var index = usersDisliked.indexOf(userId);
          dislikes = dislikes - 1;
          usersDisliked.splice(index, 1);
        }
      }
      /* Actualisation des champs nécessaires dans le schema de la sauce */
      Sauce.updateOne({ _id: sauceId },
        { dislikes: dislikes, usersDisliked: usersDisliked, likes: likes, usersLiked: usersLiked }
      )
      .then(() => res.status(200).json({message: "OK"}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}