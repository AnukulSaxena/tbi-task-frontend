import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { useEffect } from "react";
import authService from "./vercel/authConfig.js";
import { useMyContext } from "./components/MyContext.jsx";
function App() {
  const { setStatus, setUserData } = useMyContext();
  useEffect(() => {
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
  return (
    <div className="h-[100dvh] w-full pt-14 relative bg-neutral-300">
      <Header />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
