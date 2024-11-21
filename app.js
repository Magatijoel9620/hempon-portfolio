const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const services = require("./services.json"); // Dynamic services data
// Import JSON data
//onst experienceData = require("./data/experience.json");
const app = express();
const PORT = 3000;

app.set("trust proxy", 1);  // Enable Heroku or other cloud providers' reverse proxy
// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


// Import JSON data for dynamic content
const experienceData = require("./data/experience.json");
const projectsData = require("./data/projects.json");

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// API routes to serve JSON data
app.get("/api/experience", (req, res) => {
  console.log("API request for experience data received.");
  res.sendFile(path.join(__dirname, "data/experience.json"));
});

app.get("/api/projects", (req, res) => {
  console.log("API request for projects data received.");
  res.sendFile(path.join(__dirname, "data/projects.json"));
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { companyName: "Hempon Business Solutions", services });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message from ${name} (${email}): ${message}`);
  res.send(
    "<h1>Thank you for contacting us! We will get back to you soon.</h1>"
  );
});
// Projects route (using dynamic data)
app.get("/projects", (req, res) => {
  res.render("projects", { projects: projectsData });
});

// Experience route (using dynamic data)
app.get("/experience", (req, res) => {
  console.log("Accessing the /experience route");

  if (!experienceData) {
    console.log("Error: Experience data not found");
    return res.status(404).send("Experience data not found");
  }

  res.render("experience", { experience: experienceData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
