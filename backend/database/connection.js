import mongoose from "mongoose";

const uri = "mongodb+srv://ahmadyaseen:Birth%4020032004@cluster1.b2qw2xf.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster1";

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}