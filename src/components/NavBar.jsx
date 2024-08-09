import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import pittedImage from '../pitted.png';
import './NavBar.css';

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
          <img className="navbar-image" src={pittedImage} alt="so pitted" />
          <h1>SIMS (Surfboard Inventory Management System)</h1>
          <img className="navbar-image" src={pittedImage} alt="so pitted" />
      </div>
      <div className="navbar-links">
          <Link to='/'><Button className="p-button-outlined">Home</Button></Link>
          <Link to='/surfboards'><Button className="p-button-outlined">Surfboard Admin</Button></Link>
          <Link to='/users'><Button className="p-button-outlined">User Admin</Button></Link>
          {isLoggedIn ? (
            <>
              <Button className="p-button-outlined" onClick={handleLogout}>Logout</Button>
              <span className="loggedin">Logged in as: {username}</span>
            </>
          ) : (
              <Link to='/login'><Button className="p-button-outlined">Login</Button></Link>
          )}
      </div>
    </div>
  );
};