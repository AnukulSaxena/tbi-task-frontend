import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <div className="h-screen w-full pt-14 relative bg-neutral-300">
      <Header />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
