const express = require("express");
const cors = require("cors");
const connectDB = require("./bd/connect");
const locataireRoutes = require("./route/locataire");
const factureRoutes = require("./route/facture");

const app = express();
const port = process.env.PORT || 5000;

// Autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Middleware qui permet de traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de données MongoDB
connectDB();

// Routes des locataire
app.use("/locataire", locataireRoutes);

// Routes des locataire
app.use("/facture", factureRoutes);


// Lancer le serveur
app.listen(port, () => console.log(`Le serveur a démarré sur le port ${port}`));
