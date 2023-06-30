const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const factureSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    nouvelleIndex: { type: Number, required: false, default:0},
    ancienIndex: { type: Number, required: true},
    statut: { type: Boolean, required: false}
  },

);



const Facture = mongoose.model("Facture", factureSchema);

module.exports = Facture;
