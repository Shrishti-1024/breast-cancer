import express from "express";
import fast2sms from "fast-two-sms";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// SEND OTP
router.post("/send-otp", async(req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save OTP temporarily
        global.otpStore = global.otpStore || {};
        global.otpStore[phone] = otp;

        const response = await fast2sms.sendMessage({
            authorization: process.env.SMS_API_KEY,
            route: "otp",
            message: `Your HerHealth AI login OTP is ${otp}`,
            numbers: [phone],
        });

        console.log("SMS Response:", response);

        res.json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error("OTP Error:", error);
        res.status(500).json({ message: "Failed to send OTP", error });
    }
});

// VERIFY OTP
router.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;

    if (global.otpStore && global.otpStore[phone] == otp) {
        return res.json({ message: "OTP verified successfully", token: "dummy-jwt" });
    }

    res.status(400).json({ message: "Invalid OTP" });
});

export default router;