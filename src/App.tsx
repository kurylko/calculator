import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import StoreProvider from './state/storeProvider';

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Menu />
        <Outlet />
      </div>
    </StoreProvider>
  );
}

export default App;
