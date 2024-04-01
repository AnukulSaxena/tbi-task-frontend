import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Error, Home, Login, Signup } from "./pages";
import { MyContextProvider } from "./components/MyContext.jsx";

// Create a browser router with specified routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",

        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

// Render the application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <MyContextProvider>
    <StrictMode>
      <RouterProvider router={router} />{" "}
    </StrictMode>
  </MyContextProvider>
);
