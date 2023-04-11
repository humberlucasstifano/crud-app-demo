// Import required modules
const express = require("express");
const route = express.Router();

// =========================================== //
// ================== ROUTER ================= //
// =========================================== //

// This code exports a router object `route` that defines the routes for handling HTTP requests and API endpoints in the application.

// The code begins by importing required modules such as `express` and custom modules such as `services`, `controller`, `userController`, and `authMiddleware`.

// Next, the code defines route handlers for different HTTP paths using `route.get()` and specifying the function to be executed for each route. The `services` module provides functions to render different pages, such as the home page, the add task page, the update task page, the register user page, and the sign in user page.

// After that, the code defines route handlers for the API endpoints using `route.post()`, `route.get()`, `route.put()`, and `route.delete()`, and specifying the function to be executed for each endpoint. The `controller` module provides functions to handle the CRUD operations for the `taskdb` model. The `authMiddleware` module provides a middleware function to authenticate the token sent with the request and executed before the controller function. If the user is not authenticated the middleware will catch it and return rather then continuing onto the next function using `next()` ... The next function in this case would be the controller function

// Finally, the code defines route handlers for the user routes, which are used to create a new user and sign in a user using the `userController` module.

// Import CUSTOM modules
const services = require("../services/render");
const controller = require("../controller/controller");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/middleware");

// Define route handlers for different HTTP paths (DIFFERENT URLS)
route.get("/", services.homeRoutes); // Render the home page
route.get("/add-task", services.add_task); // Render the add task page
route.get("/update-task", services.update_task); // Render the update task page
route.get("/register-user", services.register_user); // Render the register user page
route.get("/signin-user", services.signInUser); // Render the sign in user page

// Define route handlers for the API endpoints (TASK)
route.post("/api/tasks", authMiddleware.authenticateToken, controller.create); // Create a new task
route.get("/api/tasks", controller.find); // Retrieve all tasks
route.put(
  "/api/tasks/:id",
  authMiddleware.authenticateToken,
  controller.update
); // Update a task by ID
route.delete(
  "/api/tasks/:id",
  authMiddleware.authenticateToken,
  controller.delete
); // Delete a task by ID

// Define route handlers for the user routes
route.post("/api/register-user", userController.registerUser); // Create a new user
route.post("/api/signin-user", userController.signInUser); // Sign in a user

// Add the notFound middleware as the last middleware in the router
route.use(services.notFound, services.handle404);

// Export the router object so it can be used by other modules
module.exports = route;

// ========== BREAKDOWN ========= //

// GET /: This route renders the home page.
// GET /add-task: This route renders the add task page.
// GET /update-task: This route renders the update task page.
// POST /api/tasks: This route creates a new task by calling the `CREATE` function in the controller module.
// GET /api/tasks: This route retrieves all tasks by calling the `FIND` function in the controller module.
// PUT /api/tasks/:id: This route updates a task by ID by calling the `UPDATE` function in the controller module.
// DELETE /api/tasks/:id: This route deletes a task by ID by calling the `DELETE` function in the controller module.
