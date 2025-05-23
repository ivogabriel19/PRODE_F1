import User from "../models/user.js";

export async function registerUser(req, res) {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error al registrar usuario", error: err });
  }
}

export async function obtenerLeaderboard(req, res) {
  try {
    const topUsers = await User.find({}, "username score").sort({ score: -1 }).limit(10); // top 10 por puntaje
    res.json(topUsers);
  } catch (err) {
    console.error("Error al obtener leaderboard:", err.message);
    res.status(500).json({ message: "Error al obtener leaderboard", error: err.message });
  }
}
