// ==========================================//
// ========== CREATE TASK FUNCTION ==========//
// ==========================================//

// In summary, this code listens for form submission events on a specific form, creates a `FormData` object from the form data, and sends an HTTP `POST` request to create a new task on the server. It does this by attaching a submit event listener to the form, creating an object from the form data, and calling the `createTask` function with the data object. The `createTask` function sends an HTTP `POST` request to the server with the task data and the user's authorization token in the request headers. It displays an alert to the user depending on the response status code, and logs error messages to the console for debugging purposes.

// Step 1: Listen for the DOMContentLoaded event to ensure the entire DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Target the form element with the ID "add_task"
  const createTaskForm = document.getElementById("add_task");
  // Add an event listener to the form to handle the 'submit' event using the 'handleCreateTask' function
  createTaskForm.addEventListener("submit", handleCreateTask);
});

// Step 2: Define the async handler function that accepts the 'submit' event
async function handleCreateTask(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(event.target);
  // Convert the FormData entries into an object
  const data = Object.fromEntries(formData.entries());

  // Call the 'createTask' function with the extracted data
  await createTask(data);
}

// Step 3: Define the async function that sends the data to the backend
const createTask = async (data) => {
  // Get the stored token from local storage
  const token = getTokenFromLocalStorage();

  try {
    // Make a POST request to the backend with the extracted data and the token in the headers
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Parse the JSON response from the server
    const taskData = await response.json();

    // Display a generic error alert to the user
    alert(`${taskData.message}`);
    // Log the specific error message to the console for debugging
    console.error(`${taskData.message}`);
  } catch (error) {
    // Log the error and show the error message in the console
    console.error(`Error creating task: ${error.response}`);
  }
};

// ==========================================//
// ========== UPDATE TASK FUNCTION ==========//
// ==========================================//

// In summary, this code listens for a form submission event on a specific form, creates a `FormData` object from the form data, and sends an HTTP `PUT` request to update the corresponding task on the server. It does this by attaching a submit event listener to the form, creating an object from the form data, and calling the `updateTask` function with the data object. The `updateTask` function sends an HTTP `PUT` request to the server with the task data, and displays an alert to the user depending on the response status code. If there's an error, it logs the error message to the console for debugging purposes.

// ------------ STEP 1: When the DOM is fully loaded, execute the following to TARGET the form element
document.addEventListener("DOMContentLoaded", () => {
  // Find the form with ID 'update_task' and assign it to the updateTaskForm variable
  const updateTaskForm = document.getElementById("update_task");

  // Add an event listener to the updateTaskForm that listens for the 'submit' event
  updateTaskForm.addEventListener("submit", handleUpdateTask);
});

// ------------ STEP 2: Define an async HANDLER function that accepts the 'submit' event
async function handleUpdateTask(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the event target (the form)
  const formData = new FormData(event.target);
  // Convert the FormData object into an object with key-value pairs
  const data = Object.fromEntries(formData.entries());

  // Call the updateTask function with the data object, and wait for it to complete
  await updateTask(data);
}

// ------------ STEP 3: Define an async function that accepts the data and sends it to the backend
const updateTask = async (data) => {
  // Get the token from local storage
  const token = getTokenFromLocalStorage();

  // Try to execute the following code block
  try {
    // Make an async PUT request to the backend with the task data
    const response = await fetch(`http://localhost:5000/api/tasks/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Parse the JSON response from the server
    const taskData = await response.json();

    // Display a generic error alert to the user
    alert(`${taskData.message}`);
    // Log the specific error message to the console for debugging
    console.error(`${taskData.message}`);
  } catch (error) {
    // If there's an error in the try block, catch it and execute the following code block
    // Display a generic error alert to the user
    alert(`${error}`);
    // Log the error to the console for debugging
    console.log(`Error updating task: ${error.response}`);
  }
};

// ==========================================//
// ========== DELETE TASK FUNCTION ==========//
// ==========================================//

// In summary, this code listens for clicks on delete buttons in a table, and when clicked, sends a request to a backend API to delete the corresponding task. It does this by attaching a click event listener to each delete button, extracting the task's ID from a `data-id` attribute on the button, and then sending a `DELETE` request to the backend API with that ID and the user's authorization token. The code also displays an alert to the user if the task is successfully deleted, and reloads the page to reflect the changes.

// ------------ STEP 1: When the DOM is fully loaded, execute the following to TARGET the form element
document.addEventListener("DOMContentLoaded", () => {
  // Select all the delete buttons in the table's tbody
  const deleteButtons = document.querySelectorAll(".table tbody td a.delete");

  // Attach a click event listener to each delete button
  deleteButtons.forEach((button) => {
    // Extract the id from the button's data-id attribute
    const id = button.getAttribute("data-id");

    // Attach a click event listener to the button that calls the handleDeleteTask function with the event and id parameters
    button.addEventListener("click", (event) => handleDeleteTask(event, id));
  });
});

// ------------ STEP 2: Define an async HANDLER function that accepts the 'click' event
async function handleDeleteTask(event, id) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Wait for the deleteTask function to complete
  await deleteTask(id);
}

// ------------ STEP 3: Define an async function that accepts the id and sends it to the backend to delete that specific entry
const deleteTask = async (id) => {
  // Get the user's token from local storage
  const token = getTokenFromLocalStorage();

  try {
    // Send a DELETE request to the backend API to delete the task with the given id
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the JSON response from the server
    const taskData = await response.json();

    // Display a generic error alert to the user
    alert(`${taskData.message}`);

    // Reload the table to show current data
    location.reload();

    // Log the specific error message to the console for debugging
    console.error(`${taskData.message}`);
  } catch (error) {
    // If there is an error during the request, log an error message with the error object
    console.error(`Error deleting task: ${error}`);
  }
};
