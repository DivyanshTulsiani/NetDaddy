import express from "express";
import 'dotenv/config';
import checkImage from "./gemini.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Ensure JSON parsing

app.post('/validate', async (req, res) => {
    console.log('Request received');
    console.log('Request Body:', req.body); // Debugging log

    if (!req.body || !req.body.image) {
        return res.status(400).json({ error: "No image provided" });
    }

    try {
        const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        let safe = await checkImage(buffer, "image/png"); // Modify format as needed

        res.status(200).json(JSON.parse(safe.response.text()));
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


