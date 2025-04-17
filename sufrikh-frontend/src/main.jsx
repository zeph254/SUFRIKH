import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import { WorkerProvider } from './context/WorkerContext';
import { AdminProvider } from './context/AdminContext';
import './index.css';
import { CustomerProvider } from './context/CustomerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkerProvider>
        <AdminProvider>
          <CustomerProvider>
            <App />
          </CustomerProvider>
        </AdminProvider>
      </WorkerProvider>
    </AuthProvider>
  </React.StrictMode>
);