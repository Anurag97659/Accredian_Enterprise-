import mongoose from "mongoose";

const connectDatabase=async ()=>{
    try {
        const mongoUri =
            process.env.MONGODB_URI?.trim() ||
            process.env.MONGO_URI?.trim() ||
            process.env.MONGODB_URL?.trim();

        if (!mongoUri) {
            throw new Error("Missing Mongo connection string. Set MONGODB_URI (or MONGO_URI) in Render environment variables.");
        }

        const dbName = process.env.DB_NAME?.trim();
        const connectionToDB = await mongoose.connect(
            mongoUri,
            dbName ? { dbName } : undefined
        );

        console.log(`Connected to MongoDB successfully. Host: ${connectionToDB.connection.host}`);
    
    } catch (error) {
        console.error("MongoDB connection failed in src/db/db.js:", error?.message || error);
        throw error;
    }
}
export default connectDatabase;