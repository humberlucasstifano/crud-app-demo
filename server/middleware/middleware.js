const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to preform this action. Please sign in!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message:
          "You are not authorized to preform this action. Please sign in!",
      });
    }
    req.user = user;
    next();
  });
};
