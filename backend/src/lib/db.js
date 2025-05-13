import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo connected at ${conn.connection.host}`);
    } catch (error) {
        console.error("Error during connection",error);
        process.exit(1);
    }
    
}