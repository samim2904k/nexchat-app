import express, { json } from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import path from "path";

dotenv.config();

const app = express()

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
}))

app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT;

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });

}

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
    connectDB();
})