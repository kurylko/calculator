import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import useFetchUserProducts from "./hooks/useFetchUserProducts";
import {useSelector} from "react-redux";
import {RootState} from "./state/store";

function App() {
  const { data } = useFetchUserProducts();
  const {currentUser} = useSelector((state: RootState) => state.user);
    console.log("user:", currentUser);
    console.log("foods:", data);

  return (
    <div className="App">
      <Menu />
      <Outlet />
    </div>
  );
}

export default App;
