import React from 'react';
import App from '.././App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodInfoPage from '../pages/FoodInfo';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import MyFoodPage from '../pages/MyFoodPage';
import Login from './auth/LogIn';
import SignUp from './auth/SignUp';
import MyPlatePage from '../pages/MyPlatePage';

interface AppRoutesProps {
  children?: React.ReactNode;
}

const AppRoutes = ({ children }: AppRoutesProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/food-info" element={<FoodInfoPage />} />
          <Route path="/my-food" element={<MyFoodPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-plate" element={<MyPlatePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
