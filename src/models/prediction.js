import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  raceId: String, // de la API de F1
  raceYear: Number,
  prediccion: {
    P1: String,
    P2: String,
    P3: String,
  },
  submittedAt: { type: Date, default: Date.now },
});

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
