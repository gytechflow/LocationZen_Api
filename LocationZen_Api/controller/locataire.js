const Locataire = require("../models/locataire");
const Facture = require("../models/facture");

// Ajouter un nouveau locataire
const ajouterLocataire = async (req, res) => {
  try {
    const { noms, prenoms, caution, montantLoyer, numeroLogement, dateDebut, dateFin, telephone, cni, logement } = req.body;

    // Créer une facture avec des valeurs par défaut
    const defaultFacture = new Facture({
      date: new Date(),
      ancienIndex: 0,
      nouveauIndex: 0,
      factureTotal: 0
    });
    const facture = await defaultFacture.save();

    const newLocataire = new Locataire({
      noms,
      prenoms,
      caution,
      dateDebut,
      montantLoyer,
      numeroLogement,
      dateFin,
      telephone,
      cni,
      logement,
      factures: [facture]
    });

    // Calculer le montant total en ajoutant la caution et le montant du loyer
    newLocataire.montantTotal = newLocataire.caution + newLocataire.montantLoyer;

    const locataire = await newLocataire.save();

    console.log(`ajouterLocataire`);

    res.status(201).json(locataire);
  } catch (error) {
    console.error(`Erreur dans ajouterLocataire: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};


// Récupérer tous les locataires
const getTousLocataires = async (req, res) => {
  try {
    const locataires = await Locataire.find().populate('factures');
    res.status(200).json(locataires);
  } catch (err) {
    console.error(`Erreur dans getTousLocataires: ${err.message}`);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des Locataires" });
  }
};

// Récupérer un locataire par son ID
const getLocataire = async (req, res) => {
  try {
    const locataire = await Locataire.findById(req.params.id).populate('factures');

    if (!locataire) {
      return res.status(404).json({ msg: "Locataire non trouvé" });
    }

    res.status(200).json(locataire);
  } catch (error) {
    console.error(`Erreur dans getLocataire: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Mettre à jour un locataire par son ID
const modifierLocataire = async (req, res) => {
  try {
    const { noms,prenoms,caution,montantLoyer,numeroLogement,dateDebut,dateFin, telephone, cni, logement, factures } = req.body;

    const locataire = await Locataire.findById(req.params.id);

    if (!locataire) {
      return res.status(404).json({ msg: "Locataire non trouvé" });
    }

    // Si des nouvelles factures sont fournies dans le corps de la requête
    if (factures) {
      // Récupérer les factures correspondantes
      const facturesExistantes = await Promise.all(factures.map(async (factureId) => {
        const facture = await Facture.findById(factureId);
        if (!facture) {
          throw new Error(`Facture avec l'ID ${factureId} introuvable`);
        }
        return facture;
      }));

      // Mettre à jour les factures du locataire avec les nouvelles factures correspondantes
      locataire.factures = facturesExistantes.map((facture) => ({
        date: facture.date,
        ancienIndex: facture.ancienIndex,
        nouveauIndex: facture.nouveauIndex
      }));
    }

    // Mettre à jour les autres propriétés du locataire
    locataire.noms = noms;
    locataire.prenoms = prenoms;
    locataire.caution = caution;
    locataire.dateDebut= dateDebut;
    locataire.montantLoyer = montantLoyer;
    locataire.numeroLogement = numeroLogement;
    locataire.dateFin = dateFin;
    locataire.telephone = telephone;
    locataire.cni = cni;
    locataire.logement = logement;
    
    // Calculer le montant total en ajoutant la caution et le montant du loyer
    locataire.montantTotal = locataire.caution + locataire.montantLoyer;
    
    const locataireModifie = await locataire.save();
    res.status(200).json(locataireModifie);
    console.log("mise à jour acceptée");
    } catch (error) {
    console.error(`Erreur dans modifierLocataire: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
    }
    };
    
    // Supprimer un locataire par son ID
    const supprimerLocataire = async (req, res) => {
    try {
    const locataire = await Locataire.findByIdAndRemove(req.params.id);
    
    if (!locataire) {
    return res.status(404).json({ msg: "Locataire non trouvé" });
    }
    
    res.status(200).json({ msg: "Locataire supprimé avec succès" });
    } catch (error) {
    console.error(`Erreur dans supprimerLocataire: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
    }
    };

    //ajouter une nouvelle cellule de facture
    const ajouterCelluleFacture = async (req, res) => {
      try {
        const locataire = await Locataire.findById(req.params.id);
    
        if (!locataire) {
          return res.status(404).json({ msg: "Locataire non trouvé" });
        }
    
        const { date, ancienIndex, nouveauIndex,factureTotal } = req.body;
    
        // Ajouter la nouvelle cellule à la liste des factures existantes
        locataire.factures.push({ date, ancienIndex, nouveauIndex, factureTotal });
    
    
        const locataireModifie = await locataire.save();
    
        res.status(200).json(locataireModifie);
      } catch (error) {
        console.error(`Erreur dans ajouterCelluleFacture: ${error.message}`);
        res.status(500).json({ msg: "Erreur serveur" });
      }
    };
    
    
    module.exports = { ajouterLocataire, getTousLocataires, getLocataire, modifierLocataire, supprimerLocataire, ajouterCelluleFacture };
