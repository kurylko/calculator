import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import useCurrentUser from './hooks/useCurrentUser';

function App() {
  const { handleGetUserData } = useCurrentUser();

  return (
    <div className="App">
      <Menu />
      <Outlet />
    </div>
  );
}

export default App;
