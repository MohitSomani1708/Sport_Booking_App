import React from 'react';

const Dropdown = ({ selectedRole, setSelectedRole, roles, message }) => {

  return (
    <select
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
      style={{height : '100%' }}
    >
      <option value="" disabled>{message}</option>
      {roles.map((role, index) => (
        <option key={index} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
