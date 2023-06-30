const mongoose = require("mongoose");
const Facture = require("./facture")
const Schema = mongoose.Schema;

const locataireSchema = new Schema(
  {
    noms: { type: String, required: true },
    prenoms: { type: String, required: true },
    statut: { type: Boolean, required: true, default: true },
    cni: { type: Number, required: true },
    logement:{type: String, required:true},
    numeroLogement: { type: String, required: true },
    telephone: { type: String, required: true },
    dateDebut: { type: Date, default: Date.now },
    dateFin: { type: Date, required: true },
    montantLoyer: { type: Number, required: true },
    caution: { type: Number, required: false, default:0},
    montantTotal: { type: Number }, // Nouvelle propriété pour stocker le montant total
    factures: [
      {
        date: { type: Date, required: true,default: Date.now},
        ancienIndex: { type: Number, required: true , default: 0},
        nouveauIndex: { type: Number, required: true, default: 0 },
        factureTotal: { type: Number, required: true, default: 0 }
      }
    ]
  },

);



const Locataire = mongoose.model("Locataire", locataireSchema);

module.exports = Locataire;
