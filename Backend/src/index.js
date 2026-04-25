import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "./db/db.js";
import app from "./app.js";
connectDatabase()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.error("Application startup failed due to MongoDB connection error:", error?.message || error);
    process.exit(1);
})
