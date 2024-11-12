import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import {AppDispatch} from "./state/store";
import {useDispatch} from "react-redux";
import {getCurrentUser} from "./state/userSlice";

function App() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);

    return (
      <div className="App">
        <Menu />
        <Outlet />
      </div>
  );
}

export default App;
