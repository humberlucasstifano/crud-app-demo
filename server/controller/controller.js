const taskdb = require("../model/model");

// =========================================== //
// ================== CREATE ================= //
// =========================================== //

// This code exports an asynchronous function `create` that takes in `req` and `res` as parameters. It is intended to handle requests to create a new task and save it to a database using the `taskdb` model.

// The function begins by extracting the required data (`name`, `task`, `role`, and `status`) from the request body using destructuring assignment. If the request body is empty, the function sends a `400 Bad Request` status code with a JSON response containing an error message and returns early.

// If the request body is not empty, the function creates a new instance of the `taskdb` model with the extracted data and saves it to the database using the `save()` method. If the save operation is successful, the function redirects the client to the `/add-task` route.

//If an error occurs during the save operation, the function sends a `500 Internal Server Error` status code with a JSON response containing an error message. This error message can either be the actual error message or a default message if no error message is available.

// ---------- CREATE TASK CONTROLLER FUNCTION
exports.create = async (req, res) => {
  // Extract the required data from the request body
  const { name, task, role, status } = req.body;

  // Validate the request body
  if (!req.body) {
    // Send a `400 Bad Request` status code with an error message
    res.status(400).json({ message: "Content can not be emtpy!" });
    // Return early
    return;
  }

  // Create a new instance of the `taskdb` model with the extracted data
  const newTask = new taskdb({ name, task, role, status });

  try {
    // Save the new task to the database
    const data = await newTask.save();
    // Redirect the client to the `/add-task` route
    res.redirect("/add-task");
  } catch (err) {
    // If an error occurs, send a `500 Internal Server Error` status code with an error message
    res.status(500).json({
      message: "Some error occurred while creating a create operation",
    });
  }
};

// ========================================= //
// ================== READ ================= //
// ========================================= //

// This code exports an asynchronous function `find` that takes in `req` and `res` as parameters. It is intended to handle requests to retrieve task information from the database using the `taskdb` model.

// The function begins by wrapping its code in a `try...catch` block to catch any errors that might occur during execution.

// If the request has a query parameter `id`, the function retrieves the value of `id` from the request query object and uses it to search the database for a task with the specified `id` using the `findById()` method. If a task with the specified `id` is not found, the function sends a `404 Not Found` status code with a JSON response containing an error message. Otherwise, it sends a JSON response containing the task data.

// If the request does not have a query parameter `id`, the function retrieves all tasks from the database using the `find()` method and sends a JSON response containing the task data.

// If an error occurs during execution, the function sends a `500 Internal Server Error` status code with a JSON response containing an error message. This error message can either be the actual error message or a default message if no error message is available.

// ---------- GET ALL TASKS CONTROLLER FUNCTION
exports.find = async (req, res) => {
  try {
    if (req.query.id) {
      // If the request has a query parameter `id`, retrieve the value of `id` from the request query object
      const id = req.query.id;
      // Use the `findById()` method to search the database for a task with the specified `id`
      const data = await taskdb.findById(id);
      if (!data) {
        // If no task is found, send a `404 Not Found` status code with an error message
        res.status(404).json({ message: "Not found task with id " + id });
      } else {
        // If a task is found, send a JSON response containing the task data
        res.send(data);
      }
    } else {
      // If the request does not have a query parameter `id`, retrieve all tasks from the database using the `find()` method
      const task = await taskdb.find();
      // Send a JSON response containing the task data
      res.send(task);
    }
  } catch (err) {
    // If an error occurs, send a `500 Internal Server Error` status code with an error message
    res.status(500).json({
      message: "Error occurred while retrieving task information",
    });
  }
};

// =========================================== //
// ================== UPDATE ================= //
// =========================================== //

// This code exports an asynchronous function `update` that takes in `req` and `res` as parameters. It is intended to handle requests to update task information in the database using the `taskdb` model.

// The function begins by checking if the request body is empty. If it is empty, the function returns early with a `400 Bad Request` status code and a JSON response containing an error message.

// If the request body is not empty, the function retrieves the `id` parameter from the request URL using `req.params.id`.

// The function then uses the `findByIdAndUpdate()` method of the taskdb model to update the task with the specified `id` with the data in the request body. The `{ useFindAndModify: false }` option is used to ensure that `findOneAndUpdate()` is used instead of the deprecated `findAndModify()` method.

// If the `findByIdAndUpdate()` method returns `null`, the function sends a `404 Not Found` status code with a JSON response containing an error message. Otherwise, the function sends a JSON response containing the updated task data.

// If an error occurs during execution, the function sends a `500 Internal Server Error` status code with a JSON response containing an error message.

// ---------- UPDATE TASK CONTROLLER FUNCTION
exports.update = async (req, res) => {
  // Check if the request body is empty
  if (!req.body) {
    // If it is, return a `400 Bad Request` status code with an error message and exit early
    return res.status(400).json({ message: "Data to update can not be empty" });
  }

  // Get the `id` parameter from the request URL
  const id = req.params.id;

  try {
    // Use the `findByIdAndUpdate()` method to update the task with the specified `id` with the data in the request body
    const updatedTask = await taskdb.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!updatedTask) {
      // If no task is found, send a `404 Not Found` status code with an error message
      res.status(404).json({
        message: `Cannot Update task with ${id}. Maybe task not found!`,
      });
    } else {
      // If the task is found, send a JSON response containing the updated task data
      res.send(updatedTask);
    }
  } catch (err) {
    // If an error occurs, send a `500 Internal Server Error` status code with an error message
    res.status(500).json({ message: "Error Update task information" });
  }
};

// =========================================== //
// ================== DELETE ================= //
// =========================================== //

// This code exports an asynchronous function `delete` that takes in `req` and `res` as parameters. It is intended to handle requests to delete a task from the database using the `taskdb` model.

// The function begins by retrieving the `id` parameter from the request URL using `req.params.id`.

// The function then uses the `findByIdAndDelete()` method of the `taskdb` model to delete the task with the specified `id`. If no task is found with the specified `id`, the function sends a `404 Not Found` status code with a JSON response containing an error message. Otherwise, the function sends a JSON response containing a success message indicating that the task was deleted successfully.

// If an error occurs during execution, the function sends a `500 Internal Server Error` status code with a JSON response containing an error message.

// ---------- DELETE TASK CONTROLLER FUNCTION
exports.delete = async (req, res) => {
  // Get the `id` parameter from the request URL
  const id = req.params.id;

  try {
    // Use the `findByIdAndDelete()` method to delete the task with the specified `id`
    const data = await taskdb.findByIdAndDelete(id);
    if (!data) {
      // If no task is found, send a `404 Not Found` status code with an error message
      res.status(404).json({
        message: `Cannot Delete with id ${id}. Maybe id is wrong`,
      });
    } else {
      // If the task is found, send a JSON response containing a success message indicating that the task was deleted successfully
      res.json({
        message: "task was deleted successfully!",
      });
    }
  } catch (err) {
    // If an error occurs, send a `500 Internal Server Error` status code with an error message
    res.status(500).json({
      message: "Could not delete task with id=" + id,
    });
  }
};
