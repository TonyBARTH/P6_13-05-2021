const express = require('express');

const router = express.Router();

const stuffControl = require('../controllers/sauce');


///// ROUTE POST /////

router.post('/', stuffControl.createSauce);
  

///// ROUTE PUT /////
  
router.put('/:id', stuffControl.modifySauce);
  
  
///// ROUTE POUR SUPPRESSION /////
  
router.delete('/:id', stuffControl.deleteSauce);
  
  
//// ROUTE POUR AFFICHER UN SEUL PRODUIT ////
  
router.get('/:id', stuffControl.getOneSauce);
  
  
//// ROUTE POUR AFFICHER TOUT ////
  
router.get('/', stuffControl.getAllSauce);


module.exports = router;