import { processPredictions } from "../utils/processPredictions.js";

export async function procesarPredicciones(req, res) {
    try {
      await processPredictions();
      res.status(200).json({ message: "Predicciones procesadas correctamente." });
    } catch (err) {
      res.status(500).json({ error: "Error al procesar predicciones." });
    }
}

export async function listarUsuarios(req, res) {
    try {
      const usuarios = await User.find().select("username role");
      const resultados = await Result.aggregate([
        { $group: { _id: "$userId", total: { $sum: "$score" } } }
      ]);

      const puntuaciones = {};
      resultados.forEach(r => puntuaciones[r._id] = r.total);

      const conPuntajes = usuarios.map(u => ({
        ...u._doc,
        totalScore: puntuaciones[u._id] || 0
      }));

      res.json(conPuntajes);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
}