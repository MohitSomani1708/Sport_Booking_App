import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashBoardPage from './Pages/DashBoardPage';
import AllBookingsPage from './Pages/AllBookingsPage';
import CentrePage from './Pages/CentrePage';
import './App.css';
import { AppProvider } from './AppContext';

const App = () => {
  return (
    <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/dashboard/all" element={<AllBookingsPage />} />
        <Route path="/dashboard/centre/:centrename" element={<CentrePage />} />
      </Routes>
    </Router>
    </AppProvider>
  );
};

export default App;
