import "./App.css";
import Drinks from "./components/Drinks";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Home from "./pages/Home";
import SpecificProduct from "./pages/SpecificProduct";
import Splash from "./pages/Splash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "./pages/Progress";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Feedback from "./pages/Feedback";
import Orders from "./pages/Orders";
import SendUs from "./pages/SendUs";
import Charges from "./pages/Charges";
import Receipts from "./pages/Receipts";

import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App bg-zinc-200 min-h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sendus" element={<SendUs />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<SpecificProduct />} />

          <Route path="/receipts" element={<Receipts />} />

          {/* ============================= */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
