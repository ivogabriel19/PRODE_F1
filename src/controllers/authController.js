import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers, saveUsers } from '../utils/userStorage.js';

//import { users } from '../data/users.js';

export async function register(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await getUsers();
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: 'Usuario ya existe' });
  
  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);

  await saveUsers(users);

  res.status(201).json({ message: 'Usuario registrado', username });

}

export async function login(req, res) {
  const { username, password } = req.body;
  
  const users = await getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}