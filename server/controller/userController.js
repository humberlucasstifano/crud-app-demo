const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// This controller function takes the user input from the request body (name, email, and password) and attempts to create a new user in the database using the mongoose user model. Before creating the new user, it checks if a user with the given email already exists. If so, it returns a 400 error message. If not, it creates a new user object using the input data, saves it to the database, and returns a success message. If any errors occur during the process, it returns a 500 error message.

// Register user controller function
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user object
    const newUser = new User({ name, email, password });
    // Save user to database
    await newUser.save();
    // Return success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Return error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// This function first retrieves the email and password data from the request body. It then attempts to find a user with the given email in the database using the `User.findOne` method. If no user is found, it returns a 400 error message indicating invalid email or password. If a user is found, it checks the validity of the password using `bcrypt.compare`. If the password is invalid, it returns the same error message. If the password is valid, it signs a JWT with the user email and password using the `jwt.sign` method and sends it back to the frontend in the response body. Note that you'll need to have a secret key stored in an environment variable or configuration file for this to work.

// Sign In user controller function
exports.signInUser = async (req, res) => {
  console.log("Request body:", req.body); // Add this line

  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(user);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Sign JWT with user email and password, AND the JWT Secret
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "365d", // expires in 365 days
    });

    // Return JWT token to frontend
    return res.status(200).send({ message: "Signed In!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
