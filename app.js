const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const services = require('./services.json'); // Dynamic services data

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { companyName: "Hempon Business Solutions", services });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Message from ${name} (${email}): ${message}`);
    res.send('<h1>Thank you for contacting us! We will get back to you soon.</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
