import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Promo from "./pages/Promo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "https://backend-1-iyjt.onrender.com";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex flex-row sm:flex-row min-h-screen">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/promos" element={<Promo url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
