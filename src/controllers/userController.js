import User from '../models/user.js';

export async function registerUser(req, res) {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar usuario', error: err });
  }
};