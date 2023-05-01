import mongoose from "mongoose";
const { connect } = mongoose;
import config from "../config/api.js";

export const connectDB = async () => {
  try {
    const conn = await connect(config.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
