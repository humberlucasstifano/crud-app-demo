// ============================================ //
// ============= HELPER FUNCTIONS ============= //
// ============================================ //

Helper functions are small, reusable pieces of code that perform specific tasks. They are designed to simplify and streamline code by abstracting repetitive or complex operations, making the main code easier to read and maintain.

In this case, the helper functions are designed to interact with the browser's local storage to manage a user's authentication token:

1. `setTokenLocalStorage(token)`: This function takes a 'token' as an argument and saves it in the browser's local storage under the key "token". The purpose of this function is to store the authentication token received from the server after the user successfully logs in or registers. Storing the token in local storage allows it to persist across browser sessions, so the user remains authenticated even if they close and reopen the browser.

2. `getTokenFromLocalStorage()`: This function retrieves the stored authentication token from the browser's local storage. It returns the value associated with the key "token". This function is useful when making API requests that require authentication, as the token can be added to the request headers to authenticate the user.

3. `removeTokenFromLocalStorage()`: This function removes the stored authentication token from the browser's local storage by removing the item associated with the key "token". This function is typically called when a user logs out of the application, effectively ending their authenticated session.

These helper functions provide an abstraction layer for managing authentication tokens in local storage, making the main code more readable and easier to maintain.
