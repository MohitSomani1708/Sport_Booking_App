import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RoleSelection from './components/RoleSelection';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Sports Centre Booking App</h1>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/booking" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

function Login() {
  const [userType, setUserType] = useState('team'); // 'team' or 'centre'
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const endpoint = 'http://localhost:5000/api/auth/login';
    
    try {
      const response = await axios.post(endpoint, { email, password });
      setToken(response.data.token);
      setLoginError('');
      localStorage.setItem('authToken', response.data.token); // Store JWT in localStorage
      navigate('/booking'); // Redirect to booking page
    } catch (error) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login to Sports Booking</h1>

        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="team"
              checked={userType === 'team'}
              onChange={() => setUserType('team')}
            />
            Team
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="centre"
              checked={userType === 'centre'}
              onChange={() => setUserType('centre')}
            />
            Centre
          </label>
        </div>

        <form onSubmit={handleLogin}>
          <div>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit">Login</button>
        </form>

        {loginError && <p>{loginError}</p>}

        <p>
          Don't have an account? <a href="/register">Sign up here</a>
        </p>
      </header>
    </div>
  );
}

function Signup() {
  const [userType, setUserType] = useState('team');
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const endpoint = 'http://localhost:5000/api/auth/register';

    try {
      await axios.post(endpoint, { email, password });
      setSignupSuccess(true);
      setSignupError('');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      setSignupError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sign Up for Sports Booking</h1>

        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="team"
              checked={userType === 'team'}
              onChange={() => setUserType('team')}
            />
            Team
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="centre"
              checked={userType === 'centre'}
              onChange={() => setUserType('centre')}
            />
            Centre
          </label>
        </div>

        <form onSubmit={handleSignup}>
          <div>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit">Sign Up</button>
        </form>

        {signupError && <p>{signupError}</p>}
        {signupSuccess && <p className="success">Signup successful! Redirecting to login...</p>}
      </header>
    </div>
  );
}

export default App;