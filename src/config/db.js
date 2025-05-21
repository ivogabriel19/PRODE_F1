import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('🟢 MongoDB conectado');
  } catch (error) {
    console.error('🔴 Error al conectar MongoDB', error);
    process.exit(1);
  }
};
