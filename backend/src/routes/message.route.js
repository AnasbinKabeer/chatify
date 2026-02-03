import express from "express";
const router = express.Router();

router.get("/send", (req, res) => {
    res.json({ message: "Send" });
});

router.get("/get", (req, res) => {
    res.json({ message: "Receive" });
});

export default router;