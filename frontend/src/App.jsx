import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import IntentCart from "./pages/IntentCart";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import DecisionEngine from "./pages/DecisionEngine";
import DecisionDashboard from "./pages/DecisionDashboard";
import SecurityCenter from "./pages/SecurityCenter";
import Negotiator from "./pages/Negotiator";
import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Cart from "./pages/Cart";
import Room2Cart from "./pages/Room2Cart";

import "./index.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/intent-cart" element={<IntentCart />} />

        <Route path="/" element={<Welcome />} />

        <Route path="/home" element={<Home />} />

        <Route path="/products" element={<Products />} />

    <Route path="/decision-dashboard/:id" element={<DecisionDashboard />} />
    <Route path="/security-center/:id" element={<SecurityCenter />} />
    <Route path="/negotiator/:id" element={<Negotiator />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/decision/:id"
          element={<DecisionEngine />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/assistant"
          element={<Assistant />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/room2cart"
          element={<Room2Cart />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
