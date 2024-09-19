import mongoose from "mongoose";

export const connectDB = async () => {
    console.log(process.env.MONGO_URI);
    
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
