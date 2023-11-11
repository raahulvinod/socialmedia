import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`${error.message}`);
  }
};

export default dbConnect;
