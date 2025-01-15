import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    const ping = await conn.connection.db.admin().ping();
    console.log(`MongoDB ping: ${ping}`);
  } catch (error) {
    console.log(`Error: ${error.message}`); // Error: connect ECONNREFUSED
  }
};
