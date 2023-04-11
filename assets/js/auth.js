// This code follows a 3-step process to handle form submission and authentication functions:

// 1. Add an event listener to the "add_task" form when the DOM is fully loaded.
// 2. When the form is submitted, prevent the default behavior and extract the form data using the handleCreateTask function.
// 3. Send the extracted data to the backend using the createTask function, which includes the token in the headers and handles response/error messages.

// ============================================ //
// ============= HELPER FUNCTIONS ============= //
// ============================================ //

// In summary, these functions provide a way to store and retrieve a user's authorization token in local storage. The `setTokenLocalStorage` function takes a token parameter and stores it in local storage with the key "token". The `getTokenFromLocalStorage` function retrieves the token from local storage using the key "token". The `removeTokenFromLocalStorage` function removes the token from local storage using the key "token". These functions can be used to persist user authentication across page refreshes or between different pages of the same website.

// ---------- SET LOCAL STORAGE
// Function to set the authorization token in local storage
function setTokenLocalStorage(token) {
  // Store the token in local storage with the key "token"
  localStorage.setItem("token", token);
}

// ---------- GET LOCAL STORAGE
// Function to get the authorization token from local storage
function getTokenFromLocalStorage() {
  // Retrieve the token from local storage using the key "token"
  return localStorage.getItem("token");
}

// ---------- REMOVE TOKEN FROM LOCAL STORAGE
// Function to remove the authorization token from local storage
function removeTokenFromLocalStorage() {
  // Remove the token from local storage using the key "token"
  localStorage.removeItem("token");
}

// This code defines a function called `updateLoginStatus` that checks if there is a token in local storage using the `getTokenFromLocalStorage` helper function, and updates the content of the `p` element with the ID "header" based on whether the user is logged in or not. The `updateLoginStatus` function is called once when the DOM is loaded, and will update the text initially.

// ---------- UPDATE LOGGED IN STATUS
// Call the function once the DOM is loaded to update the text initially
document.addEventListener("DOMContentLoaded", () => {
  updateLoginStatus();
});

// Function to update the "Logged In" text based on whether there is a token in local storage or not
function updateLoginStatus() {
  // Get the token from local storage
  const token = getTokenFromLocalStorage();

  // Get the "Logged In" text element from the DOM
  const loggedInText = document.querySelector("#header p");

  // Update the content of the "Logged In" text based on whether there is a token in local storage or not
  if (token) {
    loggedInText.textContent = "Logged In";
  } else {
    loggedInText.textContent = "Logged Out";
  }
}

// ============================================ //
// =============== REGISTER USER ============== //
// ============================================ //

// In summary, this code listens for form submission events on a specific form, creates a `FormData` object from the form data, and sends an HTTP `POST` request to register a new user on the server. It does this by attaching a submit event listener to the form, extracting the name, email, and password from the form data, and calling the `registerUser` function with the extracted data. The `registerUser` function sends an HTTP `POST` request to the server with the user's name, email, and password, and parses the JSON response from the server. If there's an error, it logs the error message to the console for debugging purposes.

// ---------- Step 1: Listen for the DOMContentLoaded event to ensure the entire DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Target the form element with the ID "register_user"
  const registerUserForm = document.getElementById("register_user");
  // Add an event listener to the form to handle the 'submit' event using the 'handleRegisterUser' function
  registerUserForm.addEventListener("submit", handleRegisterUser);
});

// ---------- Step 2: Define the async handler function that accepts the 'submit' event
const handleRegisterUser = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(event.target);
  // Extract the name, email, and password from the FormData object
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Call the 'registerUser' function with the extracted name, email, and password
  await registerUser({ name, email, password });
};

// ---------- Step 3: Define the async function that sends the name, email, and password to the backend
const registerUser = async ({ name, email, password }) => {
  try {
    // Make a POST request to the backend with the name, email, and password
    const response = await fetch("http://localhost:5000/api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Parse the JSON response from the server
    const data = await response.json();

    // Alert the user with the error handling message from the backend
    alert(`${data.message}`);
  } catch (error) {
    // Log the error in the console
    console.error(error.response);
  }
};

// ============================================ //
// =============== SIGN IN USER =============== //
// ============================================ //

// In summary, this code listens for form submission events on a specific form, creates a `FormData` object from the form data, and sends an HTTP `POST` request to sign in a user on the server. It does this by attaching a submit event listener to the form, extracting the email and password from the form data, and calling the `signInUser` function with the extracted data. The `signInUser` function sends an HTTP `POST` request to the server with the user's email and password, and parses the JSON response from the server. If there's an error, it logs the error message to the console for debugging purposes. If the response contains a token, it saves the token to local storage using the `setTokenLocalStorage` function.

// ------------ Step 1: Listen for the DOMContentLoaded event to ensure the entire DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Target the form element with the ID "signin_user"
  const signInForm = document.getElementById("signin_user");
  // Add an event listener to the form to handle the 'submit' event using the 'handleSignIn' function
  signInForm.addEventListener("submit", handleSignIn);
});

// ------------ Step 2: Define the async handler function that accepts the 'submit' event
const handleSignIn = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(event.target);
  // Extract the email and password from the FormData object
  const email = formData.get("email");
  const password = formData.get("password");

  // Call the 'signInUser' function with the extracted email and password
  await signInUser({ email, password });
};

// ------------ Step 3: Define the async function that sends the email and password to the backend
const signInUser = async ({ email, password }) => {
  try {
    // Make a POST request to the backend with the email and password
    const response = await fetch("http://localhost:5000/api/signin-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Parse the JSON response from the server
    const data = await response.json();

    console.log(data);

    // Save the token in local storage
    setTokenLocalStorage(data.token);

    // alert the user that they are signed in
    alert("Sign In Successful!");
  } catch (error) {
    // Log the error in the console
    console.error(error);

    // alert the user there was a problem signing in
    alert("Sign In ERROR! Please try again.");
  }
};

// ============================================ //
// ================ LOG OUT USER ============== //
// ============================================ //

// In summary, this code listens for a click event on a specific logout button, and when the button is clicked, it calls the `handleLogout` function. The `handleLogout` function removes the token from local storage using the `removeTokenFromLocalStorage` helper function, and alerts the user that they have been successfully logged out.

// ------------  Step 1: Listen for the DOMContentLoaded event to ensure the entire DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add an event listener to the logout button
  const logoutButton = document.querySelector(".btn-auth.btn-danger");
  logoutButton.addEventListener("click", handleLogout);
});

// ------------ Step 2: Define the function to handle logout button clicks
const handleLogout = () => {
  // Remove the token from local storage using the helper function
  removeTokenFromLocalStorage();

  // Alert the user that they have been successfully logged out
  alert("You have been successfully logged out.");
};
