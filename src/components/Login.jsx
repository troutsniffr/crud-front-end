import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { login } from '../services/api';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await login(username, password);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username); 
        navigate('/surfboards');
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    

    return (
      <div className="App">
        <header className="App-header">Login</header>
        <form onSubmit={handleLogin}>
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" label="Login" className="p-button-outlined" />
        </form>
      </div>
    );
  };