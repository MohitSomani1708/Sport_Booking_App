import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (res.ok && res.data.token) {
        localStorage.setItem('jwtToken', res.data.token);
      } else {
        console.error('Failed to log in or retrieve token');
      }
      navigate('/admin');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
