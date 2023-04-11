// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

// Import MongoDB connection function from a separate module
const connectDB = require("./server/database/connection");

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Load environment variables from .env file and set the port number
dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

// Log HTTP requests with Morgan middleware
app.use(morgan("dev"));

// Connect to MongoDB database using the connectDB function
connectDB();

// Set the view engine for rendering EJS templates
app.set("view engine", "ejs");

// Serve static files (folders CSS and JS) from the assets directory
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Load router for handling HTTP requests
app.use("/", require("./server/routes/router"));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
