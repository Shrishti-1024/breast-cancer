import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

/* ✅ CREATE PATIENT */
router.post("/register", async(req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();

        res.status(201).json({
            message: "Patient registered successfully",
            patientId: patient._id,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ✅ GET PATIENT (later for doctors/dashboard) */
router.get("/:id", async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        res.json(patient);
    } catch {
        res.status(404).json({ error: "Patient not found" });
    }
});

export default router;