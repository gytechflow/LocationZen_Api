const Facture = require("../models/facture");

// Ajouter un nouveau facture
const ajouterFacture = async (req, res) => {
  try {
    const { date, nouvelleIndex,ancienIndex,statut } = req.body;

    const newFacture = new Facture({
      nouvelleIndex,
      date,
      ancienIndex,
      statut
    });

    const facture = await newFacture.save();

    console.log(` ajouterFacture`);


    res.status(201).json(facture);
  } catch (error) {
    console.error(`Erreur dans ajouterFacture: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Récupérer tous les clients
const getTousFactures = async (req, res) => {
    try {
      const facture = await Facture.find();
      res.status(200).json(facture);


    } catch (err) {
      console.error(`Erreur dans getTousFactures: ${err.message}`);
      res.status(500).json({ message: "Erreur serveur lors de la récupération des facture" });
    }
  };

// Récupérer tous les clients avec filtres
/* const getTousClients2 = async (req, res) => {
  try {
    const { month, year } = req.query; // Récupère les critères de requête

    const filter = {};

    // Applique les critères de filtre si présents
    if (month && year) {
      filter.date = {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${parseInt(month) + 1}-01`)
      };
    }

    const clients = await Client.find(filter);
    res.status(200).json(clients);
  } catch (err) {
    console.error(`Erreur dans getTousClients: ${err.message}`);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des clients" });
  }
};
 */
// Récupérer un client par son ID
const getFacture = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);

    if (!facture) {
      return res.status(404).json({ msg: "Facture non trouvé" });
    }

    res.status(200).json(facture);
  } catch (error) {
    console.error(`Erreur dans getFacture: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Mettre à jour un client par son ID
// Mettre à jour un client par son ID
const modifierFacture = async (req, res) => {
  try {
    const { date, nouvelleIndex,ancienIndex,statut } = req.body;

    const facture = await Facture.findById(req.params.id);

    if (!facture) {
      return res.status(404).json({ msg: "Facture non trouvé" });
    }

    facture.nouvelleIndex = nouvelleIndex;
    facture.date = date;
    facture.ancienIndex = ancienIndex;
    facture.statut = statut;

    const factureModifie = await facture.save();
    res.status(200).json(factureModifie);
    console.log("mise a jour accepter")
  } catch (error) {
    console.error(`Erreur dans modifierFacture: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};


// Supprimer un client par son ID
const supprimerFacture = async (req, res) => {
try {
const facture = await Facture.findByIdAndRemove(req.params.id);

if (!facture) {
  return res.status(404).json({ msg: "Facture non trouvé" });
}

res.status(200).json({ msg: "Facture supprimé avec succès" });
} catch (error) {
console.error(`Erreur dans supprimerFacture: ${error.message}`);
res.status(500).json({ msg: "Erreur serveur" });
}
};

module.exports = { ajouterFacture, getTousFactures, getFacture, modifierFacture, supprimerFacture };
