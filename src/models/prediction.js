const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  raceId: String, // de la API de F1
  predictions: [String], // lista de IDs de pilotos (por posición)
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
