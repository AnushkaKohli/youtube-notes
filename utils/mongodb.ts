import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error in connecting to MongoDB: ", error);
  }
};

export default connectMongoDB;
