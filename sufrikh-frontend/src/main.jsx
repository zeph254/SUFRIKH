import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import { WorkerProvider } from './context/WorkerContext';
import { AdminProvider } from './context/AdminContext';
import  ErrorBoundary  from './context/ErrorBoundary';
import './index.css';
import { CustomerProvider } from './context/CustomerContext';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkerProvider>
        <AdminProvider>
          <ErrorBoundary>
          <CustomerProvider>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              limit={3}
              style={{ zIndex: 9999 }} // Ensure the toast is above other elements
              toastStyle={{ backgroundColor: '#fff', color: '#000' }} // Customize the toast style
              bodyStyle={{ color: '#000' }} // Customize the body style
              progressStyle={{ backgroundColor: '#4CAF50' }} // Customize the progress bar style
              progressClassName="toast-progress" // Custom class for the progress bar
              className="toast-container" // Custom class for the toast container
              icon={false} // Disable default icons
            />
            <App />
          </CustomerProvider>
          </ErrorBoundary>
        </AdminProvider>
      </WorkerProvider>
    </AuthProvider>
  </React.StrictMode>
);