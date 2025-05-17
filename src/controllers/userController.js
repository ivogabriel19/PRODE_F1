const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar usuario', error: err });
  }
};

module.exports = { registerUser };
