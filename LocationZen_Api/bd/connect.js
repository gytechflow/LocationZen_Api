const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/LocationZen", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connecté");
  } catch (err) {
    console.error(`Erreur de connexion à MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
