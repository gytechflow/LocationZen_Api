const express = require("express");
const router = express.Router();
const {
  ajouterLocataire,
  getTousLocataires,
  getLocataire,
  modifierLocataire,
  supprimerLocataire,
  ajouterCelluleFacture
/*   getTousLocataires2,
 */
} = require("../controller/locataire");

// Route pour créer un client
router.post("/", ajouterLocataire);

// Route pour récupérer tous les clients
router.get("/", getTousLocataires);

// Route pour récupérer un client par son ID
router.get("/:id", getLocataire);

// Route pour mettre à jour un client par son ID
router.put("/:id", modifierLocataire);

// Route pour supprimer un client par son ID
router.delete("/:id", supprimerLocataire);

// Nouvelle route pour ajouter une cellule de facture
router.post("/:id", ajouterCelluleFacture);
/* //route pour filtre
router.delete("/2", getTousLocataires2); */




module.exports = router;
