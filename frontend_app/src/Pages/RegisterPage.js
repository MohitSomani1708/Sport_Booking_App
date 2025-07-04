import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBar from '../components/InputBar';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const roles = ['Customer', 'Manager'];
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    const apiUrl = process.env.REACT_APP_API_URL + "/users/register" // Get the API URL from the env
    console.log(apiUrl);
    console.log(name, email, password, role);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name , email, password, role }),
      });

      const data = await response.json();

      if (response.status == 201) {
        setSuccessMessage('Registration successful!');
        localStorage.setItem('token', data.token); // Store the token (if provided)
        localStorage.setItem('name', data.name);
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('Error occurred during registration.');
      console.error('Error:', error);
    }
  };
  return (
    <div className='pages'>
        {/* Akska */}
    <div className='auth-containers'>
    <h2 style={{position : 'relative', top : '-20px'}}>Register Page</h2>
    <div style={{height : '20px', position : 'relative', top : '-10px'}}>
          <Dropdown selectedRole={role} setSelectedRole={setRole} roles={roles}  message="Select Role"/>
      </div>
      <form style={ { width : '40%', height : "50%", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} onSubmit={handleSubmit}>
        <div className='cred-containers'>
        <span style={{width : '300px'}}> 
                <InputBar type="username" placeholder="Enter username" value={name} setFunc={setName} />
            </span> 
         <span style={{width : '300px'}}> 
                <InputBar type="email" placeholder="Enter email" value={email} setFunc={setEmail} />
            </span>
            <span style={{width : '300px'}}> 
                <InputBar type="password" placeholder="Enter password" value={password} setFunc={setPassword} />
            </span>
            <span style={{width : '300px'}}> 
                <InputBar type="password" placeholder="Confirm password" value={confirmPassword} setFunc={setConfirmPassword} />
            </span>
        </div>
        <div style={{ top: "40px",  height : "50px", width : "200px", display:'flex', justifyContent : 'center' }}>
            <Button type="submit" text = "Register"/>
        </div>
      </form>
      <p style={{position : 'relative', bottom : '-30px'}}>
        Already have an account?{' '}
        <Link to="/" style={{ color: 'blue' }}>
          Login here
        </Link>
      </p>
        <div style={{position : 'absolute', bottom : '-100px'}}>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
        </div>
    </div>
  );
};

export default LoginPage;
