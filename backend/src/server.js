import express from "express";
import "dotenv/config"
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

const app = express();
const PORT = process.env.PORT


// app.get("/api/auth/signup", (req, res)=>{
//     res.send("Signup route");
// });

// app.get("/api/auth/login", (req, res)=>{
//     res.send("Login route");
// });

// app.get("/api/auth/logout", (req, res)=>{
//     res.send("Logout route");
// });

app.use(express.json());
app.use("/api/auth", authRoutes)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
