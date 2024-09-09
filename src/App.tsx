import React from "react";
import {Outlet} from 'react-router-dom';
import Menu from "./components/Menu";
import './App.css';


function App() {
    return (
        <div className="App">
            <Menu/>
            <Outlet/>
        </div>
    );
}


export default App;
