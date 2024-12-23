const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Portfolio_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema with explicit collection name
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
}); // Explicitly set collection name

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Populate Database
async function populateDatabase() {
    try {
        const portfolio = new Portfolio({
            summary: "Experienced software developer specializing in web development and cloud-based solutions.",
            skills: [
                "JavaScript (Vue.js, Express)",
                "Database Management (MySQL, DynamoDB)",
                "DevOps (Docker, Kubernetes)",
                "Artificial Intelligence (PyTorch, OpenAI APIs)"
            ],
            experience: [
                {
                    role: "Software Engineer",
                    period: "07/2021 - Present",
                    organization: "Innovatech Labs",
                    details: [
                        "Developed scalable web applications using Vue.js and Express.",
                        "Implemented CI/CD pipelines to streamline development workflows.",
                        "Collaborated with cross-functional teams to deliver high-quality solutions."
                    ]
                },
            ],
            education: [
                {
                    institute: "MLR Institute of Technology",
                    graduationDate: "05/2024",
                    details: [
                        "Master of Science in Computer Science.",
                        "Thesis focused on machine learning algorithms for predictive analytics."
                    ]
                }
            ],
            languages: [
                { language: "English", proficiency: "Fluent" },
                { language: "Spanish", proficiency: "Intermediate" },
                { language: "French", proficiency: "Basic" },
            ]
        });

        await portfolio.save();
        console.log("Portfolio data saved to Portfolio_data collection!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error populating database:", err);
    }
}

populateDatabase();
