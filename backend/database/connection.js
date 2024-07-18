import mongoose from "mongoose";

const uri = "mongodb+srv://Mitesh:5d81UE2osFaiNzJg@cluster0.rjlqyvs.mongodb.net/expense-tracker?retryWrites=true&w=majority";

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}