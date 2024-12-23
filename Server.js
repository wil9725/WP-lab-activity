const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Portfolio_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const portfolioSchema = new mongoose.Schema({
    summary: String,
    skills: [String],
    experience: [
        {
            role: String,
            period: String,
            organization: String,
            details: [String],
        },
    ],
    education: [
        {
            institute: String,
            graduationDate: String,
            details: [String],
        },
    ],
    languages: [
        { language: String, proficiency: String }
    ],
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

app.get("/api/portfolio", async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne(); // Fetch the first portfolio document
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.json(portfolio);
    } catch (err) {
        console.error("Error fetching portfolio:", err);
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
