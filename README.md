# Authentication App Frontend

## Overview

This documentation provides an overview of the frontend architecture, components, and functionalities of the authentication app.

### Purpose

The frontend of the authentication app serves as the user interface where users can interact with the application to register, log in, change passwords, and log out.

### Technologies Used

- React.js: A JavaScript library for building user interfaces.
- React Router: A library for routing in React applications.
- Axios: A promise-based HTTP client for making API requests.
- Tailwind CSS: A utility-first CSS framework for styling.

## Structure

The frontend architecture follows a component-based structure where each page and reusable UI element is encapsulated within its own component.

### Components

1. Header: Displays the application header with navigation links.
2. Input: Renders an input field with label and error messages.
3. Spinner: Shows a loading spinner animation.
4. LoginForm: Displays a form for users to log in.
5. SignupForm: Displays a form for users to sign up.
6. ChangePasswordForm: Allows users to change their passwords.

## Functionality

### Authentication

- Registration: Users can create a new account by providing an email, username, and password.
- Login: Existing users can log in using their username and password.
- Logout: Logged-in users can log out of their accounts.
- Password Change: Users can change their passwords after logging in.

### State Management

- Context API: Manages user authentication state using React Context API.
- LocalStorage: Stores authentication token in the browser's local storage for persistent login sessions.

### Routing

- React Router: Handles client-side routing for different application views and pages.
- Protected Routes: Restricts access to certain routes for authenticated users only.

## Deployment

The frontend application is deployed on a web server and interacts with the backend API to perform authentication-related tasks.

### Environment Variables

- VITE_APP_VERCEL_URL: Base URL of the backend API server.

## Conclusion

The frontend of the authentication app provides a user-friendly interface for users to register, log in, and manage their accounts securely. It leverages modern web technologies to deliver a seamless user experience while ensuring data privacy and security.
