import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * Root Application Shell.
 * Mounts Theme and Toast providers, and loads the Dashboard page.
 */
function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Dashboard />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
