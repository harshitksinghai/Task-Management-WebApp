import "./globals.css";
import { Outlet } from "react-router-dom";
import "react-toastify/ReactToastify.css";

const App = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default App;
