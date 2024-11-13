import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppRoutes from './components/Router';
import './App.css';
import { AuthProvider } from './contexts/authContext/authContext';
import StoreProvider from './state/storeProvider';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <StoreProvider>
        <AuthProvider>
          <AppRoutes>
            <App />
          </AppRoutes>
        </AuthProvider>
      </StoreProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
