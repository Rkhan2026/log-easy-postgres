const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client to interact with the database
const prisma = new PrismaClient();

// Create an Express app instance
const app = express();

// Middleware Setup

// Middleware to parse incoming JSON requests
app.use(express.json());

// API Endpoints
// Test endpoint to check if the API is working
app.get('/test', async (req, res) => {
    try {
        res.status(200).json({ message: 'API Is Working' });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors and send a 500 status
    }
});

// Start the server
const PORT = process.env.PORT || 4000; // Use the environment port or 4000 as a default
app.listen(port, () => console.log(`Listening to port ${port}`));