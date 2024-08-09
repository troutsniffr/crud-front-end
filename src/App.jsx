import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Users from './components/Users';
import { NavBar } from './components/NavBar';
import HomepageSurfboards from './components/Surfboards';
import { Login } from './components/Login';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-dark-indigo/theme.css";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('isLoggedIn');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
     <NavBar />
      <Routes>
        <Route path="/" element={<div><Home /></div>} />
        <Route path="/surfboards" element={<PrivateRoute><HomepageSurfboards /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;