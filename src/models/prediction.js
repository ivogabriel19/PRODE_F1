import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  raceId: String, // de la API de F1
  predictions: [String], // lista de IDs de pilotos (por posición)
  submittedAt: { type: Date, default: Date.now }
});

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;
