const express = require('express');
var cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client to interact with the database
const prisma = new PrismaClient();

// Create an Express app instance
const app = express();

// Middleware Setup

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS (Cross-Origin Resource Sharing) configuration
// enable cors
app.use(cors());
/*app.use((req, res, next) => {
    // IMPORTANT: In production, NEVER use '*' for Access-Control-Allow-Origin.
    // Replace '*' with the specific origin(s) of your frontend application(s).
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows requests from any origin (for development)
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers
    next(); // Pass control to the next middleware or route handler
});*/

// API Endpoints

// Test endpoint to check if the API is working
app.get('/test', async (req, res) => {
    try {
        res.status(200).json({ message: 'API Is Working' });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors and send a 500 status
    }
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const userData = req.body; // Get user data from the request body
        const newUser = await prisma.user.create({ data: userData }); // Create the user in the database
        res.status(201).json(newUser); // Send 201 Created status
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 4000; // Use the environment port or 4000 as a default
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));