import express from "express";
const router = express.Router();

router.get("/register", (req, res) => {
    res.json({ message: "Register" });
});

router.get("/login", (req, res) => {
    res.json({ message: "Login" });
});

export default router;