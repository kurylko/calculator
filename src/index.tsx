import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppRoutes from './components/Router';
import './App.css';
import { AuthProvider } from './contexts/authContext/authContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <AppRoutes>
          <App />
        </AppRoutes>
      </AuthProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
