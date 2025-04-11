// server.ts
import express from "express"; // Import Express
import authRoutes from "./src/routes/authRoutes"; // Import authentication routes
import dotenv from "dotenv"; // Import dotenv for environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Integrate authentication routes
app.use("/api/auth", authRoutes);

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
