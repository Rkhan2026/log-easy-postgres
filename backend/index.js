const express = require('express');
const app = express();// Create an Express app instance

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();// Initialize Prisma Client to interact with the database

// Middleware Setup
// Middleware to parse incoming JSON requests
app.use(express.json());

// API Endpoints ---> Test endpoint to check if the API is working
app.get('/', async (req, res) => {
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
app.listen(PORT, () => console.log(`Listening To Port ${PORT}`));