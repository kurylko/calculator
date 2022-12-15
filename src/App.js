import React from "react";
import { Route, Routes, Link, Router } from "react-router-dom";
import FoodInfoPage from "../pages/foodInfo";
import Home from "../pages/home";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food-info" element={<FoodInfoPage />} />
        </Routes>
      </div>
    </Router>
  );
}
    


export default App;
