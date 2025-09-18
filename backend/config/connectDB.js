import mongoose from "mongoose";


{/* ---------------------------
   CONNECTION OF MONGODB
----------------------------*/}
export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongoose connected");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);  // Exit the process with failure
    }
}