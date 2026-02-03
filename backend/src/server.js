import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
}); 