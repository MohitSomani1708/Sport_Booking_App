import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelection({ setRole }) {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setRole(role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      
      navigate('/user');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Select Your Role</h2>
      <div className="text-center mt-4">
        <button
          className="btn btn-primary mr-3"
          onClick={() => handleRoleSelection('user')}
        >
          User
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleRoleSelection('admin')}
        >
          Admin
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;
