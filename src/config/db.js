import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Cloud MongoDB conectado');
  } catch (error) {
    console.error('🔴 Error al conectar Cloud MongoDB', error);
    process.exit(1);
  }
};
