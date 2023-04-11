// Import Mongoose library
const mongoose = require("mongoose");

// Define async function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Establish MongoDB connection using URI from environment variables
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    // Print a message indicating successful connection
    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    // Handle connection errors and exit the process with a non-zero status code
    console.log(err);
    process.exit(1);
  }
};

// Export the connectDB function so it can be used by other modules
module.exports = connectDB;
