const express = require("express");
const router = express.Router();
const {
  ajouterFacture,
  getTousFactures,
  getFacture,
  modifierFacture,
  supprimerFacture,
/*   getTousLocataires2,
 */
} = require("../controller/facture");

// Route pour créer un client
router.post("/", ajouterFacture);

// Route pour récupérer tous les clients
router.get("/", getTousFactures);

// Route pour récupérer un client par son ID
router.get("/:id", getFacture);

// Route pour mettre à jour un client par son ID
router.put("/:id", modifierFacture);

// Route pour supprimer un client par son ID
router.delete("/:id", supprimerFacture);

/* //route pour filtre
router.delete("/2", getTousLocataires2); */




module.exports = router;
