
//// ROUTES POUR LES SAUCES ////


const express = require('express');
const router = express.Router();

const sauceControl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//// ROUTE POUR AFFICHER TOUT ////
router.get('/', auth, sauceControl.getAllSauce);

  
//// ROUTE POUR AFFICHER UN SEUL PRODUIT ////
router.get('/:id', auth, sauceControl.getOneSauce);


///// ROUTE POST POUR CREATION /////
router.post('/', auth, multer, sauceControl.createSauce);
  

///// ROUTE PUT POUR MODIFICATION /////
router.put('/:id', auth, multer, sauceControl.modifySauce);
  
  
///// ROUTE POUR SUPPRESSION /////
router.delete('/:id', auth, sauceControl.deleteSauce);



module.exports = router;