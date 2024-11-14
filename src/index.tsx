import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppRoutes from './components/Router';
import './App.css';
import StoreProvider from './state/storeProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './state/store';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <StoreProvider>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes>
            <App />
          </AppRoutes>
        </PersistGate>
      </StoreProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
