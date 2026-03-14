import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ROUTES */
import authRoutes from "./Route/auth.js";
import patientRoutes from "./Route/patientRoutes.js";
import otpRoutes from "./Route/otpRoutes.js"; // ⭐ NEW OTP ROUTES

dotenv.config();

const app = express();

/* Needed for __dirname in ES modules */
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/otp", otpRoutes); // ⭐ OTP API active now

/* ---------------- MULTER ---------------- */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "uploads");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

/* ---------------- AI TEST ---------------- */
app.post("/predict-image", upload.single("image"), async(req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const random = Math.random();
    res.json({
        prediction: random > 0.5 ? "Malignant" : "Benign",
        confidence: (70 + random * 30).toFixed(2),
    });
});

/* ---------------- HEALTH CHECK ---------------- */
app.get("/api/health", (req, res) => {
    res.json({
        message: "Server running ✅",
        database: mongoose.connection.name,
        host: mongoose.connection.host,
        readyState: mongoose.connection.readyState,
    });
});

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
    res.send("Server running ✅");
});

/* ---------------- MONGODB CONNECT ---------------- */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch((err) => console.error("❌ MongoDB Error", err));

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🔥 Server running on port ${PORT}`)
);