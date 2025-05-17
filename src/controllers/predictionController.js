import Prediction from '../models/prediction.js';

export async function submitPrediction (req, res) {
  const { userId, raceId, predictions } = req.body;
  try {
    const newPrediction = new Prediction({ user: userId, raceId, predictions });
    await newPrediction.save();
    res.status(201).json(newPrediction);
  } catch (err) {
    res.status(400).json({ message: 'Error al guardar predicción', error: err });
  }
};
