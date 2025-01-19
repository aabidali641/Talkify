import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connnected : ${conn.connection.host}`);
  } catch (err) {
    console.log("Mongoose Connection Error : ", err);
  }
};
