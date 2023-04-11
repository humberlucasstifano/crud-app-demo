// Import axios library for making HTTP requests
const axios = require("axios");

// Handler for the home page route
exports.homeRoutes = (req, res) => {
  // Make a GET request to the /api/tasks endpoint
  axios
    .get("http://localhost:5000/api/tasks")
    .then(function (response) {
      // Render the home page with the task data received from the server
      res.render("index", { tasks: response.data });
    })
    .catch((err) => {
      // Handle errors and send an error response
      res.send(err);
    });
};

// Handler for the add task page route
exports.add_task = (req, res) => {
  // Render the add task page
  res.render("add_task");
};

// Handler for the register page route
exports.register_user = (req, res) => {
  // Render the add task page
  res.render("register_user");
};

// Handler for the sign in page route
exports.signInUser = (req, res) => {
  // Render the add task page
  res.render("sign_in_user");
};

// Handler for the update task page route
exports.update_task = (req, res) => {
  // Make a GET request to the /api/tasks endpoint with a query parameter specifying the task ID to update
  axios
    .get("http://localhost:5000/api/tasks", { params: { id: req.query.id } })
    .then(function (taskdata) {
      // Render the update task page with the task data received from the server
      res.render("update_task", { task: taskdata.data });
    })
    .catch((err) => {
      // Handle errors and send an error response
      res.send(err);
    });
};

// Handler for 404 errors
exports.handle404 = (req, res, next) => {
  res.status(404).render("404");
};

// Export the middleware function
exports.notFound = (req, res, next) => {
  next();
};

// ========== BREAKDOWN ========= //

// --- The module exports three functions:
// `homeRoutes`: This function is a route handler for the home page. It makes a GET request to the `/api/tasks` endpoint and renders the `index` template with the task data received from the server.
// `add_task`: This function is a route handler for the add task page. It renders the add_task template.
// `update_task`: This function is a route handler for the update task page. It makes a GET request to the `/api/tasks` endpoint with a query parameter specifying the task ID to update, and renders the `update_task` template with the task data received from the server.
