// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, setShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple authentication check for demonstration
    if (username === 'admin' && password === 'password') {
      onLogin(true);
      setShowLogin(false);
      navigate('/Manager');
    } 
    else if (username === 'mikidadi' && password === '123456') {
        onLogin(true);
        setShowLogin(false);
        navigate('/Manager');
      }else {
      alert('Invalid credentials');
    }
  };

  const handleBackClick = () => {
    setShowLogin(false);
    navigate('/');
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleBackClick}>Cancel</button>
      </form>
    </div>
  );
}

export default Login;
