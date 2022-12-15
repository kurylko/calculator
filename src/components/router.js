import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import FoodInfoPage from "../pages/foodInfo";
import Home from "../pages/home";

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/food-info" element={<FoodInfoPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;