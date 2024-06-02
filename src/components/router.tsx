import React from "react";
import App from '.././App';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import FoodInfoPage from "../pages/foodInfo";
import Home from "../pages/home";
import Blog from "../pages/blog";

interface AppRoutesProps {
    children?: React.ReactNode;
}


const AppRoutes : React.FC<AppRoutesProps> = ({ children }) => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="/food-info" element={<FoodInfoPage />} />
                    <Route path="/blog" element={<Blog />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;