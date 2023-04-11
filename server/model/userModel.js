// Import necessary modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define user schema
userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash and salt password before saving user
userSchema.pre("save", async function (next) {
  user = this;
  // Check if the password is being modified
  if (!user.isModified("password")) {
    return next();
  }
  // Generate a salt
  salt = await bcrypt.genSalt(10);
  // Hash the password using the salt
  hash = await bcrypt.hash(user.password, salt);
  // Store the hashed password in the user object
  user.password = hash;
  next();
});

// Define User model using userSchema
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;

// The code defines a Mongoose schema for a user that includes name, email, and password fields. Before saving the user, the password is hashed and salted using the bcrypt library. The pre('save') hook is used to perform this operation. Finally, the User model is defined using the schema and exported.
