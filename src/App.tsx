import React from "react";
import AppRoutes from "./components/router";
import Menu from "./components/menu";
import './App.css';

function App() {
    return (
        <div className="App">
            <Menu/>
            <h1 className="hello">Hello</h1>
            <AppRoutes/>
        </div>
    );
}


export default App;
