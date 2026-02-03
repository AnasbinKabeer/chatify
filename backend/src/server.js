import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
}); 