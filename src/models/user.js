import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  exactMatches: { type: Number, default: 0 },
  perfectPredictions: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
export default User;
