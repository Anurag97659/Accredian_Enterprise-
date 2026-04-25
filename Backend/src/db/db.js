import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
});

const connectDatabase=async ()=>{
    try {
        const mongoUri = process.env.MONGODB_URI?.replace(/\/+$/, "") ?? "";
        const dbName = process.env.DB_NAME?.replace(/^\/+/, "") ?? "";
        const connectionToDB = await mongoose.connect(`${mongoUri}/${dbName}`);
        console.log(`\n Connected to database(chill man)✔️✔️ DB HOST:${connectionToDB.connection.host}`);
    
    } catch (error) {
        console.error("mongo db connection problem in ds.js file (this shit is real!!!!!!!❌❌❌❌)")
        throw error;
    }
}
export default connectDatabase;