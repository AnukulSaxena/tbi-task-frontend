import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { useEffect } from "react";
import authService from "./vercel/authConfig.js";
import { useMyContext } from "./components/MyContext.jsx";

// Main component of the application
function App() {
  const { setStatus, setUserData } = useMyContext();

  // Effect hook to fetch current user data when component mounts
  useEffect(() => {
    // Call AuthService to get current user data
    authService.getCurrentUser().then((res) => {
      if (res) {
        setStatus(true);
        setUserData(res);
      } else {
        setStatus(false);
        setUserData(null);
      }
    });
  }, []);

  // Render the main layout of the application
  return (
    <div className="h-[100dvh] w-full pt-14 relative bg-neutral-300">
      <Header />
      <main className="h-full w-full">
        {" "}
        <Outlet />
      </main>
    </div>
  );
}

export default App; // Export the App component
